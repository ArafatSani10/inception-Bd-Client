import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // .env থেকে root নাও
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
