import "../style/Dashboard.css";
import { Navbar } from "../layout/NavBar";
import { ProgressBar } from "../components/ui/ProgressBar";
import { CreateExpenseForm } from "../components/expenses/CreateExpenseForm";
import { CreateBudgetForm } from "../components/budget/CreateBudgetForm";
import { getBudget } from "../services/AuthService";
import { use, useEffect, useState } from "react";
import { useUser } from "../context/AuthContext";
export const DashboardPage = () => {
    const {token} = useUser();
    const [budget,setBudget] = useState(null);
    const [spent,setSpent] = useState(0);
    const [fromDate,setFromDate] = useState(null);
    const [tillDate, setTillDate] = useState(null);
    const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

    useEffect(() => {
        if (token){
            const fetchBudget = async () => {
                try {
                    const data = await getBudget(token);
                    setSpent(data.budget - data.remainingBudget);
                    setFromDate(new Date(data.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
                    setTillDate(new Date(data.endDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'}));
                    console.log(`Data: ${data}`)
                    setBudget(data);
                } catch (error) {
                    console.error("Error happen");
                }
            }
            fetchBudget();
        }
    },[token]);

    if (!token || !budget) return <p>Loading...</p>
    

    return(
        <div className="dashboard-container">
            <div className="dashboard-content">
                <div className="budget-container">
                    <div className="budget-info">
                        <div className="info">
                            <h3>Monthly Budget</h3>
                            <span>{budget.budget}</span>
                        </div>
                        <div className="info">
                            <h3>Period</h3>
                            <span>{fromDate} - {tillDate}</span>
                        </div>
                    </div>
                    <ProgressBar spent={spent} total={budget.budget}/>
                    <div className="budget-details">
                        <div className="detail">
                            <p>Spent</p>
                            <span>{budget.budget - budget.remainingBudget}</span>
                        </div>
                        <div className="detail">
                            <p>Remaining</p>
                            <span>{budget.remainingBudget}</span>
                        </div>
                    </div>
                </div>
                <div className="dashboard-actions">
                    <button className="budget-expense-option-btn" onClick={() => setIsExpenseModalOpen(true)}>Create Expense</button>
                    <button className="budget-expense-option-btn" onClick={() => setIsBudgetModalOpen(true)}>Create Budget</button>
                </div>

                {(isBudgetModalOpen || isExpenseModalOpen) && (
                    <div className="modal-overlay">
                        {isBudgetModalOpen && (
                            <CreateBudgetForm onClose={() => setIsBudgetModalOpen(false)}/>
                        )}
                        {isExpenseModalOpen && (
                            <CreateExpenseForm onClose={() => setIsExpenseModalOpen(false)}/>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}