import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;

// Create axios instance
const secureAxios = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // allow cookies if backend uses httpOnly refresh tokens
});

const useAxiosWithAuth = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor → attach access token
    secureAxios.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor → handle expired token
    secureAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Token expired or unauthorized
        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true; // prevent infinite loop

          try {
            // Call refresh endpoint
            const res = await axios.post(
              `${baseUrl}/auth/refresh`,
              {},
              { withCredentials: true } // send refresh token cookie
            );

            const newAccessToken = res.data?.data?.accessToken;

            if (newAccessToken) {
              // Save new token
              localStorage.setItem("access-token", newAccessToken);

              // Update request with new token
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;

              // Retry failed request
              return secureAxios(originalRequest);
            }
          } catch (refreshError) {
            // Refresh also failed → force logout
            await logOut();
            navigate("/login");
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return [secureAxios];
};

export default useAxiosWithAuth;
