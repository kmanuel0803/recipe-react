import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";


export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState<string | null>(null);

    const { registerUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors(null); // Reset errors on new submit attempt

        try {
            const success = await registerUser(name, email, password, confirmPassword);
            if( success ) {
                alert('Registration Successful!')
                navigate('/login');
            }
           
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.status === 400) {
                    if(error.response.data.errors) {
                        setErrors(error.response.data.errors[0].msg);
                    }
                  
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
    }


    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 login-card">
            <h4 className="text-center mb-4">Registration Form</h4>
            {errors && <div style={{ color: 'red', marginBottom: '1rem', textAlign: "center" }}>{errors}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Name" value={name}
                    onChange={(e) => setName(e.target.value)}
                    required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirm-password" placeholder="Confirm Password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required/>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
                <p className="message">
                        Already registered? <Link to="/login"> Login here</Link>
                </p>
            </form>
        </div>
        </div>
    )
}