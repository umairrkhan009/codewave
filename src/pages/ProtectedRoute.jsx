import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const { name } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!name) navigate("/");
  }, [name, navigate]);

  return name ? children : null;
}

export default ProtectedRoute;
