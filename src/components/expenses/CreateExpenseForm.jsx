import "../../style/CreateExpenseForm.css"
import {createExpense} from "../../services/AuthService";
import { useState } from "react";
import { useUser } from "../../context/AuthContext";
export const CreateExpenseForm = ({ onCreateExpense , onClose }) => {
    const {token} = useUser();
    const [form,setForm] = useState({
        title: "",
        amount: 0,
        category: "",
        budgetId: 1
    });

    const handleFormChange = (key,value) => {
        setForm(prev => ({...prev,[key]:value}))
    };

    return(
        <form action="">
            <button type="button" className="form-action" onClick={onClose}>Close</button>
            <label className="form-label" htmlFor="expense-title">Expense title</label>
            <input 
            className="form-input"
            type="text"
            id="expense-title"
            placeholder="Expense title..."
            onChange={(e) => handleFormChange('title',e.target.value)}
            />
            <label className="form-label" htmlFor="expense-amount" >Amount</label>
            <input 
            className="form-input"
            type="text"
            id="expense-amount"
            placeholder="Expense title..."
            onChange={(e) => handleFormChange('amount',e.target.value)}
            />
            <label className="form-label" htmlFor="category">Category</label>
            <input 
            className="form-input"
            type="text"
            id="category"
            placeholder="Expense title..."
            onChange={(e) => handleFormChange('category',e.target.value)}
            />
            <label className="form-label" htmlFor="budget">Chose budget</label>
            <select name="budget-options" id="budget" defaultValue='test' >
                <option value="test">Test</option>
                <option value="railway">Railway</option>
            </select>
            <button type="button" className="form-action" onClick={() => onCreateExpense(token,form)}>Submit expense</button>
        </form>
    )
}