import { useState } from "react";
import "../style/Registration.css"
import { registerUser } from "../services/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export const RegistrationPage = () => {
    const inputs = [
        { label: 'Name', name: 'name', type: 'text' },
        { label: 'Lastname', name: 'lastname', type: 'text' },
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Password', name: 'password', type: 'password' },
    ];

    const [form, setForm] = useState({
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleChange = (input, e) => {
        setForm({ ...form, [input]: e.target.value })
    }

    const handleSignUp = async () => {
        if (Object.values(form).some(v => !v)) {
            showToast("Please fill in all fields.", 'error');
            return;
        }
        try {
            await registerUser(form);
            showToast(`Account created! Welcome, ${form.name}.`, 'success');
            navigate('/login');
        } catch (error) {
            showToast(error.message, 'error');
        }
    }

    return (
        <div className="registration-page">
            {/* Lijevi panel — vidljiv samo na desktopu */}
            <div className="reg-brand-panel">
                <div className="reg-brand-icon">📊</div>
                <h1>ExpenseTracker</h1>
                <p>Join thousands of users who manage their budgets smarter every day.</p>
            </div>

            {/* Desni panel — forma */}
            <div className="registration-form-panel">
                <div className="registration-card">
                    {/* Logo za mobilni */}
                    <div className="reg-brand-mobile">
                        <div className="brand-dot" />
                        <span>ExpenseTracker</span>
                    </div>

                    <div className="registration-card-header">
                        <h2>Create an account</h2>
                        <p>Fill in your details to get started</p>
                    </div>

                    <div className="reg-fields">
                        {inputs.map(input => (
                            <div className="reg-input" key={input.name}>
                                <label htmlFor={input.name}>{input.label}</label>
                                <input
                                    type={input.type}
                                    placeholder={`Enter your ${input.label.toLowerCase()}`}
                                    id={input.name}
                                    value={form[input.name]}
                                    onChange={(e) => handleChange(input.name, e)}
                                />
                            </div>
                        ))}
                    </div>

                    <button className="reg-button" onClick={handleSignUp}>Create account</button>

                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
