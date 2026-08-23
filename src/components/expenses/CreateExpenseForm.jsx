import "../../style/CreateExpenseForm.css"
import { getExpenseCategories } from "../../services/AuthService";
import { useEffect, useState } from "react";
import { useUser } from "../../context/AuthContext";

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
        setForm(prev => ({ ...prev, [key]: value }))
    };

    useEffect(() => {
        getExpenseCategories(token).then(data => setCategories(data)).catch(() => setCategories([]))
    }, [token])

    return (
        <form>
            <button type="button" className="btn-primary" onClick={onClose}>Close</button>
            <label className="form-label" htmlFor="expense-title">Expense title</label>
            <input
                className="form-input"
                type="text"
                id="expense-title"
                placeholder="Expense title..."
                onChange={(e) => handleFormChange('title', e.target.value)}
            />
            <label className="form-label" htmlFor="expense-amount">Amount</label>
            <input
                className="form-input"
                type="number"
                id="expense-amount"
                placeholder="0.00"
                onChange={(e) => handleFormChange('amount', e.target.value)}
            />
            <label className="form-label" htmlFor="expense-category">Expense category</label>
            <select
                onChange={(e) => handleFormChange('category', e.target.value)}
                name="budget-options"
                id="expense-category"
                defaultValue=""
            >
                <option value="">Select category</option>
                {categories !== null ? (
                    categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))
                ) : (
                    <option disabled>Loading...</option>
                )}
            </select>
            <button type="button" className="btn-primary" onClick={() => onCreateExpense(token, form)}>Submit expense</button>
        </form>
    )
}
