import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function Login() {
    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: "",
    });
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const redirectTo = location.state?.from || "/host";

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await loginUser(loginFormData);
            console.log(res, res.token);
            // setError(null);
            // Redirect to the home page
            navigate(redirectTo, { replace: true });
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setStatus("idle");
        }
    }

    return (
        <div className="login container">
            {location.state?.message && (
                <h3 className="text-danger">{location.state.message}</h3>
            )}
            <h1>Sign in to your account</h1>
            {error && <h3 className="text-danger">{error.message}</h3>}
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    onChange={handleChange}
                    value={loginFormData.email}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={loginFormData.password}
                    required
                />
                <button type="submit" disabled={status === "submitting"}>
                    {status === "submitting" ? "Logging in..." : "Log in"}
                </button>
            </form>
        </div>
    );
}
