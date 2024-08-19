import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<string | null>(null);

    const location = useLocation();
    const from = location.state?.from?.pathname || '/recipe/list';

    useEffect(() => {
        if (isAuthenticated()) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors(null); // Reset errors on new submit attempt

        try {
            await loginUser(email, password);

            if (isAuthenticated()) {
                navigate(from, { replace: true });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 401) {
                    setErrors("Invalid credentials. Please try again.");
                } else if (error.response) {
                    setErrors(`Login failed: ${error.response.data.message}`);
                } else {
                    setErrors("Login failed due to a network error.");
                }
            } else if (error instanceof Error) {
                setErrors(error.message);
            } else {
                setErrors("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 login-card">
                <h4 className="text-center mb-4">Login to your account</h4>
                
                {errors && <div style={{ color: 'red', marginBottom: '1rem', textAlign: "center" }}>{errors}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    <p className="message">
                        Not registered? <Link to="/signup"> Signup here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
