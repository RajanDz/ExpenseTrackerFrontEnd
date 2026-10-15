import "../../style/CreateExpenseForm.css"
import { getExpenseCategories } from "../../services/AuthService";
import { useEffect, useState } from "react";
import { useUser } from "../../context/AuthContext";
import { X } from "lucide-react";

export const CreateExpenseForm = ({ onCreateExpense, budgetId, onClose }) => {
    const { token } = useUser();
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
                    <span className="cf-modal-eyebrow">NEW EXPENSE</span>
                    <h2 className="cf-modal-title">Add an expense</h2>
                </div>
                <button className="cf-close-btn" type="button" onClick={onClose}><X size={16} /></button>
            </div>

            <div className="cf-fields">
                <div className="cf-field">
                    <label htmlFor="expense-title">Expense title</label>
                    <input
                        type="text"
                        id="expense-title"
                        placeholder="e.g. Weekly groceries"
                        value={form.title}
                        onChange={(e) => handleFormChange('title', e.target.value)}
                    />
                </div>

                <div className="cf-field">
                    <label htmlFor="expense-amount">Amount</label>
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
                    <label>Category</label>
                    <div className="cf-pills">
                        {categories === null ? (
                            <span className="cf-loading">Loading...</span>
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
                <button type="button" className="cf-btn-cancel" onClick={onClose}>Cancel</button>
                <button
                    type="button"
                    className="cf-btn-submit"
                    disabled={!isValid}
                    onClick={() => onCreateExpense(token, form)}
                >
                    Add expense
                </button>
            </div>
        </div>
    );
};
