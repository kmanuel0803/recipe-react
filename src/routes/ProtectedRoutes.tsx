import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
    children: React.ReactNode;
};

const ProtectedRoutes = ({ children }: Props) => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    // Check authentication status
    if (!isAuthenticated()) {
        // Redirect to login page with the current location to return after login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Render protected content if authenticated
    return <>{children}</>;
};

export default ProtectedRoutes;
