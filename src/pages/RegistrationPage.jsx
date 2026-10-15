import { useState } from "react";
import "../style/Registration.css";
import { registerUser } from "../services/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useTranslation } from "react-i18next";

export const RegistrationPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const inputs = [
        { label: t('register.name_label'), name: 'name', type: 'text', placeholder: t('register.name_placeholder') },
        { label: t('register.lastname_label'), name: 'lastname', type: 'text', placeholder: t('register.lastname_placeholder') },
        { label: t('register.username_label'), name: 'username', type: 'text', placeholder: t('register.username_placeholder') },
        { label: t('register.email_label'), name: 'email', type: 'email', placeholder: t('register.email_placeholder') },
        { label: t('register.password_label'), name: 'password', type: 'password', placeholder: t('register.password_placeholder') },
    ];

    const [form, setForm] = useState({
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (input, e) => {
        setForm({ ...form, [input]: e.target.value });
    };

    const handleSignUp = async () => {
        if (Object.values(form).some(v => !v)) {
            showToast(t('toast.fill_fields'), 'error');
            return;
        }
        try {
            await registerUser(form);
            showToast(t('toast.account_created', { name: form.name }), 'success');
            navigate('/login');
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    return (
        <div className="registration-page">
            <div className="reg-brand-panel">
                <div className="reg-brand-icon">📊</div>
                <h1>ExpenseTracker</h1>
                <p>{t('register.brand_tagline')}</p>
            </div>

            <div className="registration-form-panel">
                <div className="registration-card">
                    <div className="reg-brand-mobile">
                        <div className="brand-dot" />
                        <span>ExpenseTracker</span>
                    </div>

                    <div className="registration-card-header">
                        <h2>{t('register.title')}</h2>
                        <p>{t('register.subtitle')}</p>
                    </div>

                    <div className="reg-fields">
                        {inputs.map(input => (
                            <div className="reg-input" key={input.name}>
                                <label htmlFor={input.name}>{input.label}</label>
                                <input
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    id={input.name}
                                    value={form[input.name]}
                                    onChange={(e) => handleChange(input.name, e)}
                                />
                            </div>
                        ))}
                    </div>

                    <button className="reg-button" onClick={handleSignUp}>{t('register.submit')}</button>

                    <p className="auth-footer">
                        {t('register.have_account')} <Link to="/login">{t('register.sign_in')}</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
