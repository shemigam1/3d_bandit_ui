import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
	children?: ReactNode;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const user = useAuth();
	return user ? children : <Navigate to="/login" />;
	// if (!user ?? !user?.token) return <Navigate to="/login" />;
	// return <Outlet />;
};

export default ProtectedRoute;
