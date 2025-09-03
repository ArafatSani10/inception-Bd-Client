import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRoleQuery } from "../redux/api/authApi";
import AuthContext from "../Content/Authcontext";

const AdminRouter = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext);

  // Fetch role from backend
  const { data, isLoading: roleLoading, isError } = useGetRoleQuery();

  // Redirect logic
  useEffect(() => {
    if (!authLoading && !roleLoading) {
      // If user not logged in OR role not admin, redirect
      if (!user || isError || data?.data?.role !== "admin") {
        navigate("/login");
      }
    }
  }, [user, authLoading, data, roleLoading, isError, navigate]);

  // Show nothing while loading
  if (authLoading || roleLoading) return null;

  // Prevent children render if user or role invalid
  if (!user || data?.data?.role !== "admin") return null;

  return <>{children}</>;
};

export default AdminRouter;
