import { useEffect, useState } from "react";
import "../../style/ExpenseFilters.css"; 
import { useUser } from "../../context/AuthContext";
import { getExpenseCategories } from "../../services/AuthService";
export const ExpenseFilters = ({activeBudgetId, form, setForm, handleSearchByFilters}) => {

    const {token} = useUser();
    const [categories, setCategories] = useState([]);

    const handleFormChange = (e) => {
        setForm(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    useEffect(() => {
        getExpenseCategories(token).then(data => setCategories(data));
    }, [token])
    return(
        <div className="expense-filters-container">
            <div className="filter-container">
                <label htmlFor="fromDate">FromDate</label>
                <input 
                type="date"
                id="fromDate"
                name="fromDate"
                value={form.fromDate}
                onChange={handleFormChange}
                />
            </div>
            <div className="filter-container">
                <label htmlFor="toDate">ToDate</label>
                <input 
                type="date"
                id="toDate"
                name="toDate"
                value={form.toDate}
                onChange={handleFormChange}
                />
            </div>

                <select className="category-list" name='category' id="categoryList" onChange={(e) => handleFormChange(e)}>
                    <option value="">Category</option>
                    {categories.length > 0 && (
                        categories.map(categorie => (
                            <option  value={categorie}>{categorie}</option>
                        ))
                    )}
                </select>

            <div 
           className={`price-container ${form.amountSort === "ASC" ? "active" : ""}`}
            onClick={() => setForm(prev => ({...prev,amountSort: "ASC"}))}
            name="priceSort"
            value={"ASC"}
            >
                <button
                >PRICE</button>
                <span class="material-symbols-outlined price-icon">
                arrow_upward
                </span>
            </div>
            <div
            className={`price-container ${form.amountSort === "DESC" ? "active" : ""}`}
            onClick={() => setForm(prev => ({...prev,amountSort: "DESC"}))}
            name="priceSort"
            value={"DESC"}
            >
            <button>PRICE</button>
            <span class="material-symbols-outlined price-icon">
            arrow_downward
            </span>
            </div>
            <button className="btn-primary btn-filters" onClick={() => handleSearchByFilters()}>Apply</button>
        </div>
    )
}