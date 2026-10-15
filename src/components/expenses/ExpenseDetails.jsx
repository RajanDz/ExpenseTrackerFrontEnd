import { ShoppingBag, X, Trash } from "lucide-react";
import "../../style/ExpenseDetails.css";

export const ExpenseDetails = ({expense, handleCLose, onExpenseDelete}) => {

    if (!expense){
        return (
        <div className="expense-details-container">
            <p>Loading...</p>
        </div>
        )
    }
    
    return (
        <div className="expense-details-container">

            <div className="expense-header-details">

                <div className="expense-side">

                    <div className="icon-wrapper">
                        <ShoppingBag/>
                    </div>

                    <div className="expense-detail">
                        <h3>{expense.name}</h3>
                        <div className="category-wrapper">
                            <div className="circle"></div>
                            <p>{expense.category}</p>
                        </div>
                    </div>
                </div>

                <X onClick={handleCLose} className="close-btn"/>
            </div>


            <div className="expense-amount-view">
                <h3>TOTAL</h3>
                <p className="expense-amount">{expense.amount}€</p>
            </div>

            <div className="expense-details">
                <div className="detail">
                    <p className="column-name">Id</p>
                    <p>{expense.id}</p>
                </div>
                <div className="detail">
                    <p className="column-name">Date</p>
                    <p>{new Date(expense.dateTime).toLocaleString('en-GB',{
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</p>
                </div>
                <div className="detail">
                    <p className="column-name">Category</p>
                    <p>{expense.category}</p>
                </div>
            </div>
            <div className="delete-container" onClick={() => onExpenseDelete(expense.id)}>
                    <Trash/>
                    <p>Delete</p>
            </div>
                {/* <div className="expense-details-buttons">
                <button className="close-btn" onClick={handleCLose}>Close</button>
                <button className="delete-btn" onClick={() => onExpenseDelete(expense.id)}>Delete</button>    
                </div>
                <label htmlFor="id">Id: {expense ? expense.id : "Test"}</label>
                <label htmlFor="title">Title: {expense ? expense.name : "Test"}</label>
                 <label htmlFor="title">Amount: {expense ? expense.amount : "Test"}€</label>
                  <label htmlFor="title">Created at: {expense ? expense.dateTime : "Test"}</label>
                   <label htmlFor="title">Category: {expense ? expense.category : "Test"} </label> */}
        </div>
    )
}