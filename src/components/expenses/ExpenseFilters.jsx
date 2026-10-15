import { useEffect, useState } from "react";
import "../../style/ExpenseFilters.css";
import { useUser } from "../../context/AuthContext";
import { getExpenseCategories } from "../../services/AuthService";
import { useTranslation } from "react-i18next";

export const ExpenseFilters = ({ activeBudgetId, form, setForm, handleSearchByFilters }) => {
    const { token } = useUser();
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);

    const handleFormChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const isFilterActive = () => {
        return form.fromDate !== "" ||
            form.toDate !== "" ||
            form.category !== "" ||
            form.amountSort !== "";
    };

    useEffect(() => {
        getExpenseCategories(token).then(data => setCategories(data));
    }, [token]);

    return (
        <div className="expense-filters-container">
            <div className="filter-container">
                <label htmlFor="fromDate">{t('filters.from_date')}</label>
                <input
                    type="date"
                    id="fromDate"
                    name="fromDate"
                    value={form.fromDate}
                    onChange={handleFormChange}
                />
            </div>
            <div className="filter-container">
                <label htmlFor="toDate">{t('filters.to_date')}</label>
                <input
                    type="date"
                    id="toDate"
                    name="toDate"
                    value={form.toDate}
                    onChange={handleFormChange}
                />
            </div>

            <select className="category-list" name="category" id="categoryList" onChange={handleFormChange}>
                <option value="">{t('filters.category')}</option>
                {categories.length > 0 && (
                    categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))
                )}
            </select>

            <div
                className={`price-container ${form.amountSort === "ASC" ? "active" : ""}`}
                onClick={() => setForm(prev => ({ ...prev, amountSort: "ASC" }))}
            >
                <button>{t('filters.price')}</button>
                <span className="material-symbols-outlined price-icon">arrow_upward</span>
            </div>
            <div
                className={`price-container ${form.amountSort === "DESC" ? "active" : ""}`}
                onClick={() => setForm(prev => ({ ...prev, amountSort: "DESC" }))}
            >
                <button>{t('filters.price')}</button>
                <span className="material-symbols-outlined price-icon">arrow_downward</span>
            </div>

            {isFilterActive() && (
                <button className="btn-primary btn-filters" onClick={() => handleSearchByFilters()}>{t('filters.apply')}</button>
            )}
        </div>
    );
};
