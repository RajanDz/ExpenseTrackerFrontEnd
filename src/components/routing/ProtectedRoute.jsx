import { Navigate } from "react-router-dom";
import { useUser } from "../../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
    const { token } = useUser();
    if (!token) return <Navigate to="/" replace />;
    return children;
};
