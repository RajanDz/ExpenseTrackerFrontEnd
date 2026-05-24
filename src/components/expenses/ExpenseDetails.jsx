import { useEffect, useState } from "react"
import { getExpenseDetails } from "../../services/AuthService";
import { useUser } from "../../context/AuthContext";
export const ExpenseDetails = ({expenseId,budgetId}) => {
    
    const [expense,setExpense] = useState("");
    const {token} = useUser();

    useEffect(() => {
            getExpenseDetails(token,expenseId,budgetId)
            .then(data => setExpense(data));
    },[expenseId]);
    return (
        <div className="expense-details-container">
                <label htmlFor="title">{expense.name}</label>
                 <label htmlFor="title">{expense.amount}</label>
                  <label htmlFor="title">{expense.dateTime}</label>
                   <label htmlFor="title">{expense.category}</label>
        </div>
    )
}