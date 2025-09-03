import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Content/Authcontext";

const ProtectedRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [accessToken, setAccessToken] = useState(undefined); // undefined = not checked yet

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setAccessToken(token || null);
  }, []);

  // While either auth or token is still loading, show nothing (or spinner)
  if (loading || accessToken === undefined) {
    return null; // or return <Spinner />
  }

  // Redirect if user is not logged in OR access token is missing
  if (!user || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouter;
