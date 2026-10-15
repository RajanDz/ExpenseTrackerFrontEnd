import { useState } from "react";
import "../style/LoginPage.css";
import { loginUser } from "../services/AuthService";
import { useUser } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { handleSetToken } = useUser();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { t } = useTranslation();

    const handleLogin = async () => {
        if (!username || !password) {
            showToast(t('toast.fill_fields'), 'error');
            return;
        }
        try {
            const data = await loginUser(username, password);
            handleSetToken(data.jwt);
            navigate("/");
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleLogin();
    };

    return (
        <div className="login-page">
            <div className="login-brand-panel">
                <div className="brand-icon">💰</div>
                <h1>ExpenseTracker</h1>
                <p>{t('login.brand_tagline')}</p>
            </div>

            <div className="login-form-panel">
                <div className="login-card">
                    <div className="login-brand-mobile">
                        <div className="brand-dot" />
                        <span>ExpenseTracker</span>
                    </div>

                    <div className="login-card-header">
                        <h2>{t('login.welcome')}</h2>
                        <p>{t('login.subtitle')}</p>
                    </div>

                    <div className="login-fields">
                        <div className="login-field">
                            <label htmlFor="username-input">{t('login.username_label')}</label>
                            <input
                                type="text"
                                placeholder={t('login.username_placeholder')}
                                id="username-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="login-field">
                            <label htmlFor="password-input">{t('login.password_label')}</label>
                            <input
                                type="password"
                                placeholder={t('login.password_placeholder')}
                                id="password-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>

                    <button className="btn-auth" onClick={handleLogin}>{t('login.submit')}</button>

                    <p className="auth-footer">
                        {t('login.no_account')} <Link to="/registration">{t('login.create_one')}</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
