import { useState } from "react";
import "../../style/CreateBudgetForm.css";
import { useUser } from "../../context/AuthContext";
import { createBudget } from "../../services/AuthService";
import { useToast } from "../../context/ToastContext";
import { X } from "lucide-react";

export const CreateBudgetForm = ({ onClose }) => {
    const { token } = useUser();
    const { showToast } = useToast();
    const [form, setForm] = useState({
        name: "",
        budget: "",
        startDate: "",
        endDate: "",
        type: ""
    });

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBudget(form, token);
            showToast("Budget created successfully!", 'success');
            onClose();
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    const isValid = form.name.trim() && form.budget && form.startDate && form.endDate && form.type;

    return (
        <div className="cf-modal">
            <div className="cf-modal-header">
                <div>
                    <span className="cf-modal-eyebrow">NEW BUDGET</span>
                    <h2 className="cf-modal-title">Create a budget</h2>
                </div>
                <button className="cf-close-btn" type="button" onClick={onClose}><X size={16} /></button>
            </div>

            <form className="cf-fields" onSubmit={handleSubmit}>
                <div className="cf-field">
                    <label htmlFor="budget-title">Budget title</label>
                    <input
                        type="text"
                        id="budget-title"
                        name="name"
                        placeholder="e.g. Plata Avgust"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="cf-field">
                    <label htmlFor="budget-amount">Budget amount</label>
                    <div className="cf-amount-wrapper">
                        <input
                            type="number"
                            id="budget-amount"
                            name="budget"
                            placeholder="0.00"
                            value={form.budget}
                            onChange={handleChange}
                        />
                        <span className="cf-currency">€</span>
                    </div>
                </div>

                <div className="cf-date-row">
                    <div className="cf-field">
                        <label htmlFor="start-date">Start date</label>
                        <input
                            type="date"
                            id="start-date"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="cf-field">
                        <label htmlFor="end-date">End date</label>
                        <input
                            type="date"
                            id="end-date"
                            name="endDate"
                            value={form.endDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="cf-field">
                    <label>Type</label>
                    <div className="cf-toggle">
                        {['STRICT', 'FLEX'].map(t => (
                            <button
                                key={t}
                                type="button"
                                className={`cf-toggle-btn${form.type === t ? ' cf-toggle-btn--active' : ''}`}
                                onClick={() => setForm(prev => ({ ...prev, type: t }))}
                            >
                                {t.charAt(0) + t.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="cf-actions">
                    <button type="button" className="cf-btn-cancel" onClick={onClose}>Cancel</button>
                    <button type="submit" className="cf-btn-submit" disabled={!isValid}>
                        Create budget
                    </button>
                </div>
            </form>
        </div>
    );
};
