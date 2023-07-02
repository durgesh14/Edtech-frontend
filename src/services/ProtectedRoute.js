import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthService from "./AuthService";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const tokenFromCookie = await AuthService.getToken();
      setToken(tokenFromCookie);
    };
    fetchToken();
  }, []);

  if (token === null) {
    return <div>Loading...</div>;
  }
  console.log("protect::::", token);
  return token ? children : <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoute;
