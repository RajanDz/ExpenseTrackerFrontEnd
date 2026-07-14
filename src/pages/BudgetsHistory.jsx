import "../style/BudgetHistory.css"
import { useEffect, useState } from "react";
import { useUser } from "../context/AuthContext"
import { activateBudget, getNonActiveBudgets } from "../services/AuthService";

export const BudgetHistory = () => {
    const {token} = useUser();
    const [loading,setLoading] = useState(true);
    const [nonActiveBudgetsList, setNonActiveBudgetsList] = useState([])
    const [selectedBudgetId, setSelectedBudgetId] = useState(null);

    useEffect(() => {
        const loadBudgets = async () => {
            const data = await getNonActiveBudgets(token,0);
            setNonActiveBudgetsList(data);
            setLoading(false)
        }
        loadBudgets();
    },[token])

    if (!token) return <p className="login-msg">You need to login to acces this resources...</p>
    if (loading) return <p className="loading-msg">Loading...</p>
    
    const handleSelectedBudgetId = (budgetId) => {
        if (budgetId === selectedBudgetId){
            setSelectedBudgetId(null);
        } else {
            setSelectedBudgetId(budgetId);
        }
    }

   const handleBudgetActivate = async (budgetId) => {
        await activateBudget(token,budgetId);
        alert("Budget activated");
        window.location.reload();
    }
    return(
        <div className="budgets-history-container">
            <div className="budgets-container">
                {nonActiveBudgetsList.length >= 1  ? (
                    <div className="budgets-list">
                        {nonActiveBudgetsList.map(budget => (
                            <div key={budget.id} className={selectedBudgetId === budget.id ? "budget-item selected" : "budget-item"} onClick={() => handleSelectedBudgetId(budget.id)}>
                                <p>{budget.name}</p>
                                {selectedBudgetId !== budget.id ? (
                                    <>  
                                    <p>Type: {budget.type}</p>
                                    <p>End date{budget.endDate}</p>
                                    </>
                                ): (
                                    <div className="budget-btn-options">
                                    <button className="btn-primary" onClick={() => handleBudgetActivate(budget.id)}>Activate</button>
                                     <button className="btn-primary">Review</button>
                                    </div>
                                   
                                )}
                            </div>
                        ))}
                    </div>
                ): (
                    <p>List is empty.</p>
                )}
            </div>
        </div>

    )
}