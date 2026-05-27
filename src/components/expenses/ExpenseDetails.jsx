import { useEffect, useState } from "react"
import { getExpenseDetails } from "../../services/AuthService";
import { useUser } from "../../context/AuthContext";
import "../../style/ExpenseDetails.css";
export const ExpenseDetails = ({expense,handleCLose}) => {

    

    if (!expense){
        return (
        <div className="expense-details-container">
            <p>Loading...</p>
        </div>
        )
    }

    return (
        <div className="expense-details-container">
                <button onClick={handleCLose}>Close</button>
                <label htmlFor="title">Title: {expense ? expense.name : "Test"}</label>
                 <label htmlFor="title">Amount: {expense ? expense.amount : "Test"}€</label>
                  <label htmlFor="title">Created at: {expense ? expense.dateTime : "Test"}</label>
                   <label htmlFor="title">Category: {expense ? expense.category : "Test"} </label>
        </div>
    )
}