import { useState } from "react";
import "../../style/CreateBudgetForm.css"
import { useUser } from "../../context/AuthContext";
import { createBudget } from "../../services/AuthService";
import { useToast } from "../../context/ToastContext";

export const CreateBudgetForm = ({ onClose }) => {
    const { token } = useUser();
    const { showToast } = useToast();
    const [form, setForm] = useState({
        name: "",
        budget: "",
        startDate: "",
        endDate: "",
        type: ""
    })

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBudget(form, token);
            showToast("Budget created successfully!", 'success');
            onClose();
        } catch (error) {
            showToast(error.message, 'error');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="button" className="btn-primary" onClick={onClose}>Close</button>
            <label className="form-label" htmlFor="budget-title">Budget title</label>
            <input
                className="form-input"
                type="text"
                id="budget-title"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Budget title..."
            />
            <label className="form-label" htmlFor="budget-amount">Budget amount</label>
            <input
                className="form-input"
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                id="budget-amount"
                placeholder="0.00"
            />
            <label className="form-label" htmlFor="start-date">Start date</label>
            <input
                className="form-input"
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                id="start-date"
            />
            <label className="form-label" htmlFor="end-date">End date</label>
            <input
                className="form-input"
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                id="end-date"
            />
            <label className="form-label" htmlFor="type-options">Type</label>
            <select name="type" id="type-options" onChange={handleChange} value={form.type}>
                <option value="">Select</option>
                <option value="FLEX">Flex</option>
                <option value="STRICT">Strict</option>
            </select>
            <button className="btn-primary" type="submit">Submit budget</button>
        </form>
    )
}
