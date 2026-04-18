import "../../style/CreateExpenseForm.css"
export const CreateExpenseForm = ({ onClose }) => {

    return(
        <form action="">
            <button type="button" className="form-action" onClick={onClose}>Close</button>
            <label className="form-label" htmlFor="expense-title">Expense title</label>
            <input 
            className="form-input"
            type="text"
            id="expense-title"
            placeholder="Expense title..."
            />
            <label className="form-label" htmlFor="expense-amount">Amount</label>
            <input 
            className="form-input"
            type="text"
            id="expense-amount"
            placeholder="Expense title..."
            />
            <label className="form-label" htmlFor="category">Category</label>
            <input 
            className="form-input"
            type="text"
            id="category"
            placeholder="Expense title..."
            />
            <label className="form-label" htmlFor="budget">Chose budge</label>
            <select name="budget-options" id="budget" defaultValue='test'>
                <option value="test">Test</option>
                <option value="railway">Railway</option>
            </select>
            <button className="form-action">Submit expense</button>
        </form>
    )
}