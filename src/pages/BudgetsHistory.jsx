import "../style/BudgetHistory.css"
import { useEffect, useState } from "react";
import { useUser } from "../context/AuthContext"
import { activateBudget, getNonActiveBudgets } from "../services/AuthService";
import { useToast } from "../context/ToastContext";

export const BudgetHistory = () => {
    const { token } = useUser();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [nonActiveBudgetsList, setNonActiveBudgetsList] = useState([]);
    const [selectedBudgetId, setSelectedBudgetId] = useState(null);

    const loadBudgets = async () => {
        try {
            const data = await getNonActiveBudgets(token, 0);
            setNonActiveBudgetsList(data ?? []);
        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!token) return;
        loadBudgets();
    }, [token])

    if (loading) return <p className="loading-msg">Loading...</p>

    const handleSelectedBudgetId = (budgetId) => {
        setSelectedBudgetId(prev => prev === budgetId ? null : budgetId);
    }

    const handleBudgetActivate = async (budgetId) => {
        try {
            await activateBudget(token, budgetId);
            showToast("Budget activated!", 'success');
            await loadBudgets();
            setSelectedBudgetId(null);
        } catch (error) {
            showToast(error.message, 'error');
        }
    }

    return (
        <div className="budgets-history-container">
            <div className="budgets-container">
                <h2 className="budgets-history-title">Budget History</h2>
                {nonActiveBudgetsList.length >= 1 ? (
                    <div className="budgets-list">
                        {nonActiveBudgetsList.map(budget => (
                            <div
                                key={budget.id}
                                className={selectedBudgetId === budget.id ? "budget-item selected" : "budget-item"}
                                onClick={() => handleSelectedBudgetId(budget.id)}
                            >
                                <p>{budget.name}</p>
                                {selectedBudgetId !== budget.id ? (
                                    <>
                                        <p>Type: {budget.type}</p>
                                        <p>End: {budget.endDate}</p>
                                    </>
                                ) : (
                                    <div className="budget-btn-options">
                                        <button
                                            className="btn-primary"
                                            onClick={(e) => { e.stopPropagation(); handleBudgetActivate(budget.id); }}
                                        >
                                            Activate
                                        </button>
                                        <button className="btn-primary">Review</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="budgets-empty">No inactive budgets found.</p>
                )}
            </div>
        </div>
    )
}
