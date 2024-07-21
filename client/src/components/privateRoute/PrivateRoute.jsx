import { useEffect } from "react";
import authenticatedStore from "../../store/authenticated.store";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = authenticatedStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return children;
};

export default PrivateRoute;
