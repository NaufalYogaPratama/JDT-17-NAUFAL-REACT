import { Outlet, Navigate, useLocation } from "react-router"
import { useToken } from "../hooks/useToken";

const ProtectedRoute = () => {
    const { pathname } = useLocation();
    const { user } = useToken();

    const isAuthRoute = pathname === "/login";

    if (!user?.accessToken && !isAuthRoute) {
        return <Navigate to="/login" replace />;
    }

    if (user?.accessToken && isAuthRoute) {
        return <Navigate to="/" replace />;
    }

    return <Outlet/>
}

export default ProtectedRoute