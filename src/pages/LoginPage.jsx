import { useState } from "react"
import "../style/LoginPage.css"
import { loginUser } from "../services/AuthService";
import { useUser } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { handleSetToken } = useUser();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleLogin = async () => {
        if (!username || !password) {
            showToast("Please fill in all fields.", 'error');
            return;
        }
        try {
            const data = await loginUser(username, password);
            handleSetToken(data.jwt);
            navigate("/");
        } catch (error) {
            showToast(error.message, 'error');
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleLogin();
    }

    return (
        <div className="login-page">
            {/* Lijevi panel — vidljiv samo na desktopu */}
            <div className="login-brand-panel">
                <div className="brand-icon">💰</div>
                <h1>ExpenseTracker</h1>
                <p>Take control of your finances. Track every expense, stay on budget.</p>
            </div>

            {/* Desni panel — forma */}
            <div className="login-form-panel">
                <div className="login-card">
                    {/* Logo za mobilni */}
                    <div className="login-brand-mobile">
                        <div className="brand-dot" />
                        <span>ExpenseTracker</span>
                    </div>

                    <div className="login-card-header">
                        <h2>Welcome back</h2>
                        <p>Sign in to your account to continue</p>
                    </div>

                    <div className="login-fields">
                        <div className="login-field">
                            <label htmlFor="username-input">Username</label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                id="username-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="password-input">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                id="password-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>

                    <button className="btn-auth" onClick={handleLogin}>Sign in</button>

                    <p className="auth-footer">
                        Don't have an account? <Link to="/registration">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
