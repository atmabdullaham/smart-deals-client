import { useContext } from "react";

import { Navigate, useLocation } from "react-router";
import AuthContext from "../contexts/AuthContext";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }
  if (user && user.email) {
    return children;
  }
  return <Navigate to="/auth/login" state={location.pathname}></Navigate>;
};

export default PrivateRoutes;
