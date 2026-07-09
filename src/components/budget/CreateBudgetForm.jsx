import { useState } from "react";
import "../../style/CreateBudgetForm.css"
import { useUser } from "../../context/AuthContext";
import { createBudget } from "../../services/AuthService";
export const CreateBudgetForm = ({ onClose }) => {

    const {token} = useUser();
    const [form,setForm] = useState({
        name: "",
        budget: 0,
        startDate: "",
        endDate: "",
        type: ""
    })
    const handleChange = (e) => {
        setForm(prev => ({...prev, [e.target.name]: e.target.value}))
    }


    const handleSubmit = async (e) => {
        await createBudget(form,token);
        onClose();
        alert("Budget is created!")
    }

    return(
        <form action="" onSubmit={handleSubmit}>
            <button type="button" className="btn-primary" onClick={onClose}>Close</button>
            <label className="form-label" htmlFor="expense-title">Budget title</label>
            <input 
            className="form-input"
            type="text"
            id="budget-title"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Expense title..."
            />
            <label className="form-label" htmlFor="expense-amount">Budget</label>
            <input 
            className="form-input"
            type="text"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            id="budget-amount"
            placeholder="Expense title..."
            />
            <label className="form-label" htmlFor="category">Start date</label>
            <input 
            className="form-input"
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            id="category"
            placeholder="Expense title..."
            />
            <label className="form-label" htmlFor="budget">End date</label>
            <input 
            className="form-input"
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            id="category"
            placeholder="Expense title..."
            />
            <label className="form-label" htmlFor="type-options">Type</label>
            <select  name="type" id="type-options" onChange={handleChange}>
                <option value="">Select</option>
                <option value="FLEX">Flex</option>
                <option value="STRICT">Strict</option>
            </select>
            <button className="btn-primary" type="submit">Submit budget</button>
        </form>
    )
}