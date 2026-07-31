import "../../style/ExpenseFilters.css"; 
export const ExpenseFilters = () => {

    return(
        <div className="expense-filters-container">
            <div className="filter-container">
                <label htmlFor="fromDate">FromDate</label>
                <input 
                type="date"
                id="fromDate"
                />
            </div>
            <div className="filter-container">
                <label htmlFor="toDate">ToDate</label>
                <input 
                type="date"
                id="ToDate"
                />
            </div>

                <select className="category-list" name="" id="categoryList">
                    <option value="default-value">Category</option>
                </select>

            <div className="price-container">
                <button>PRICE</button>
                <span class="material-symbols-outlined price-icon">
                arrow_upward
                </span>
            </div>
            <div className="price-container">
                <button>PRICE</button>
                <span class="material-symbols-outlined price-icon">
                arrow_downward_alt
                </span>
            </div>
        </div>
    )
}