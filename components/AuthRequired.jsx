import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthRequired() {
    const authenticated = false;
    const location = useLocation();

    if (!authenticated) {
        return (
            <Navigate
                to="/login"
                state={{
                    message: "You must log in first",
                    from: location.pathname,
                }}
                replace
            />
        );
    }

    return <Outlet />;
}
