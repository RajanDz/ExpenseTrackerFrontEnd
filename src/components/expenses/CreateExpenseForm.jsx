import "../../style/CreateExpenseForm.css";
import { getExpenseCategories } from "../../services/AuthService";
import { useEffect, useState } from "react";
import { useUser } from "../../context/AuthContext";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CreateExpenseForm = ({ onCreateExpense, budgetId, onClose }) => {
    const { token } = useUser();
    const { t } = useTranslation();
    const [categories, setCategories] = useState(null);
    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "",
        budgetId: budgetId
    });

    const handleFormChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        getExpenseCategories(token).then(data => setCategories(data)).catch(() => setCategories([]));
    }, [token]);

    const isValid = form.title.trim() && form.amount && form.category;

    return (
        <div className="cf-modal">
            <div className="cf-modal-header">
                <div>
                    <span className="cf-modal-eyebrow">{t('createExpense.eyebrow')}</span>
                    <h2 className="cf-modal-title">{t('createExpense.title')}</h2>
                </div>
                <button className="cf-close-btn" type="button" onClick={onClose}><X size={16} /></button>
            </div>

            <div className="cf-fields">
                <div className="cf-field">
                    <label htmlFor="expense-title">{t('createExpense.name_label')}</label>
                    <input
                        type="text"
                        id="expense-title"
                        placeholder={t('createExpense.name_placeholder')}
                        value={form.title}
                        onChange={(e) => handleFormChange('title', e.target.value)}
                    />
                </div>

                <div className="cf-field">
                    <label htmlFor="expense-amount">{t('createExpense.amount_label')}</label>
                    <div className="cf-amount-wrapper">
                        <input
                            type="number"
                            id="expense-amount"
                            placeholder="0.00"
                            value={form.amount}
                            onChange={(e) => handleFormChange('amount', e.target.value)}
                        />
                        <span className="cf-currency">€</span>
                    </div>
                </div>

                <div className="cf-field">
                    <label>{t('createExpense.category_label')}</label>
                    <div className="cf-pills">
                        {categories === null ? (
                            <span className="cf-loading">{t('createExpense.loading')}</span>
                        ) : (
                            categories.map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    className={`cf-pill${form.category === cat ? ' cf-pill--active' : ''}`}
                                    onClick={() => handleFormChange('category', cat)}
                                >
                                    {cat}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="cf-actions">
                <button type="button" className="cf-btn-cancel" onClick={onClose}>{t('createExpense.cancel')}</button>
                <button
                    type="button"
                    className="cf-btn-submit"
                    disabled={!isValid}
                    onClick={() => onCreateExpense(token, form)}
                >
                    {t('createExpense.submit')}
                </button>
            </div>
        </div>
    );
};
