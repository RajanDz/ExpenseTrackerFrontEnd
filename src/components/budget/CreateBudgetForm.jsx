import { useState } from "react";
import "../../style/CreateBudgetForm.css";
import { useUser } from "../../context/AuthContext";
import { createBudget } from "../../services/AuthService";
import { useToast } from "../../context/ToastContext";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CreateBudgetForm = ({ onClose }) => {
    const { token } = useUser();
    const { showToast } = useToast();
    const { t } = useTranslation();
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
            showToast(t('toast.budget_created'), 'success');
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
                    <span className="cf-modal-eyebrow">{t('createBudget.eyebrow')}</span>
                    <h2 className="cf-modal-title">{t('createBudget.title')}</h2>
                </div>
                <button className="cf-close-btn" type="button" onClick={onClose}><X size={16} /></button>
            </div>

            <form className="cf-fields" onSubmit={handleSubmit}>
                <div className="cf-field">
                    <label htmlFor="budget-title">{t('createBudget.name_label')}</label>
                    <input
                        type="text"
                        id="budget-title"
                        name="name"
                        placeholder={t('createBudget.name_placeholder')}
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="cf-field">
                    <label htmlFor="budget-amount">{t('createBudget.amount_label')}</label>
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
                        <label htmlFor="start-date">{t('createBudget.start_label')}</label>
                        <input
                            type="date"
                            id="start-date"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="cf-field">
                        <label htmlFor="end-date">{t('createBudget.end_label')}</label>
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
                    <label>{t('createBudget.type_label')}</label>
                    <div className="cf-toggle">
                        {[
                            { value: 'STRICT', label: t('createBudget.strict') },
                            { value: 'FLEX', label: t('createBudget.flex') }
                        ].map(({ value, label }) => (
                            <button
                                key={value}
                                type="button"
                                className={`cf-toggle-btn${form.type === value ? ' cf-toggle-btn--active' : ''}`}
                                onClick={() => setForm(prev => ({ ...prev, type: value }))}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="cf-actions">
                    <button type="button" className="cf-btn-cancel" onClick={onClose}>{t('createBudget.cancel')}</button>
                    <button type="submit" className="cf-btn-submit" disabled={!isValid}>
                        {t('createBudget.submit')}
                    </button>
                </div>
            </form>
        </div>
    );
};
