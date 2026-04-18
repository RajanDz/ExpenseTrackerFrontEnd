import "../../style/CreateBudgetForm.css"
export const CreateBudgetForm = ({ onClose }) => {

    return(
        <form action="">
            <button type="button" className="form-action" onClick={onClose}>Close</button>
            <label className="form-label" htmlFor="expense-title">Budget title</label>
            <input 
            className="form-input"
            type="text"
            id="expense-title"
            placeholder="Expense title..."
            />
            <label className="form-label" htmlFor="expense-amount">Budget</label>
            <input 
            className="form-input"
            type="text"
            id="expense-amount"
            placeholder="Expense title..."
            />
            <label className="form-label" htmlFor="category">Start date</label>
            <input 
            className="form-input"
            type="date"
            id="category"
            placeholder="Expense title..."
            />
            <label className="form-label" htmlFor="budget">End date</label>
            <input 
            className="form-input"
            type="date"
            id="category"
            placeholder="Expense title..."
            />
            <button className="form-action">Submit budget</button>
        </form>
    )
}