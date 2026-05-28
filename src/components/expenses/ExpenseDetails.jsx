import { useEffect, useState } from "react"
import { getExpenseDetails } from "../../services/AuthService";
import { useUser } from "../../context/AuthContext";
import "../../style/ExpenseDetails.css";
export const ExpenseDetails = ({expense,handleCLose, onExpenseDelete}) => {

    useEffect(() => {
        console.log(`Expense detail: ${expense ? expense.id : "nema nista"}`)
    }, [expense]);

    if (!expense){
        return (
        <div className="expense-details-container">
            <p>Loading...</p>
        </div>
        )
    }
    
    return (
        <div className="expense-details-container">

                <div className="expense-details-buttons">
                <button className="close-btn" onClick={handleCLose}>Close</button>
                <button className="delete-btn" onClick={() => onExpenseDelete(expense.id)}>Delete</button>    
                </div>
                <label htmlFor="id">Id: {expense ? expense.id : "Test"}</label>
                <label htmlFor="title">Title: {expense ? expense.name : "Test"}</label>
                 <label htmlFor="title">Amount: {expense ? expense.amount : "Test"}€</label>
                  <label htmlFor="title">Created at: {expense ? expense.dateTime : "Test"}</label>
                   <label htmlFor="title">Category: {expense ? expense.category : "Test"} </label>
        </div>
    )
}