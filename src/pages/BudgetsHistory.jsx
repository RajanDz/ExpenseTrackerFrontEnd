import "../style/BudgetHistory.css"
import { useEffect, useState } from "react";
import { useUser } from "../context/AuthContext"
import { getNonActiveBudgets } from "../services/AuthService";

export const BudgetHistory = () => {
    const {token} = useUser();
    const [loading,setLoading] = useState(true);
    const [nonActiveBudgetsList, setNonActiveBudgetsList] = useState([])


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
    

    return(
        <div className="budgets-history-container">
            <div className="budgets-container">
                {nonActiveBudgetsList.length >= 1  ? (
                    <div className="budgets-list">
                        {nonActiveBudgetsList.map(budget => (
                            <div key={budget.id} className="budget-item">
                                <p>{budget.name}</p>
                                <p>Type: {budget.type}</p>
                                <p>End date{budget.endDate}</p>
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