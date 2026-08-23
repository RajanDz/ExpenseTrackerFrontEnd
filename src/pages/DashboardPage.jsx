import "../style/Dashboard.css";
import { Navbar } from "../layout/NavBar";
import { ProgressBar } from "../components/ui/ProgressBar";
import { CreateExpenseForm } from "../components/expenses/CreateExpenseForm";
import { CreateBudgetForm } from "../components/budget/CreateBudgetForm";
import { ExpenseDetails } from "../components/expenses/ExpenseDetails";
import { fetchBudgetExpense, getBudget, createExpense, getExpenseDetails, deleteExpense, getExpensesByFilters } from "../services/AuthService";
import { use, useEffect, useState } from "react";
import { useUser } from "../context/AuthContext";
import { useDashboard } from "../hooks/useDashboard";
import { ExpenseFilters } from "../components/expenses/ExpenseFilters";
export const DashboardPage = () => {
    const {token} = useUser();
    const [fromDate,setFromDate] = useState(null);
    const [tillDate, setTillDate] = useState(null);
    const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [isExpenseDetailsOpen, setIsExpenseDetailOpen] = useState(false);
    const [expenseDetailsId, setExpenseDetailId] = useState();
    const [expense, setExpense] = useState(null);
    const [page,setPage] = useState(0);

   

    const handleExpenseDetail = async (expense) => {
        if (!budget) return
        try {
            setExpense(null);
            setIsExpenseDetailOpen(true);
            const data = await getExpenseDetails(token,expense.id, budget.id);
            setExpense(data);
        } catch (error) {
            console.error(error)
        }
    }

    const handleClose = () => {
        setIsExpenseDetailOpen(false);
    }

    const {
        budget,
        setExpenses,
        expenses,
        totalPages,
        loading,
        error,
        createDashboardExpense,
        refreshDashboard
    } = useDashboard(token,page)

    
     const [form,setForm] = useState({
        budgetId: budget !== null ? budget.id: null,
        fromDate: "",
        toDate: "",
        category: "",
        amountSort: ""
    });

    useEffect(() => {
        if (budget){
            setForm(prev => ({...prev,budgetId: budget.id}))
        }
    },[budget?.id])


    const handleSearchByFilters = async (currentPage = page) => {
            setExpenses( await getExpensesByFilters(form,token,currentPage))
        }

    useEffect(() => {
        if (page !== null && form.budgetId){
                handleSearchByFilters(page)
        }
           
    },[page]);

    if (!token) return <p className="login-msg">You need to login to access this resources...</p>
    if (!budget) return <p className="loading-msg">Loading...</p>
    const spent = budget.budget - budget.remainingBudget;

    

    const handleCreateExpense = async (token,exepenseBody) => {
        await createDashboardExpense(exepenseBody);
        setIsExpenseModalOpen(false);
    }
    const handleExpenseDelete = async (expenseId) => {
        await deleteExpense(token,expenseId);
        setIsExpenseDetailOpen(false);
        refreshDashboard(page);
    }

    return(
        <div className="dashboard-container">
            <div className="dashboard-content">
                <div className="budget-container">
                    <div className="budget-info">
                        <div className="info">
                            <h3>{budget.name}</h3>
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
                            <span>{budget.budget - budget.remainingBudget}€</span>
                        </div>
                        <div className="detail">
                            <p>Remaining</p>
                            <span>{budget.remainingBudget}€</span>
                        </div>
                    </div>
                </div>
                <div className="dashboard-actions">
                    <button className="btn-primary" onClick={() => setIsExpenseModalOpen(true)}>Create Expense</button>
                    <button className="btn-primary" onClick={() => setIsBudgetModalOpen(true)}>Create Budget</button>
                    <div className="pagination">
                            <button className="page-btn" onClick={() => setPage(prev => Math.max(0, prev - 1))}>&larr;</button>
                            <p>{page}</p>
                            <button className="page-btn" onClick={() => setPage(prev => Math.min(totalPages - 1,prev + 1))}>&rarr;</button>
                    </div>
                </div>

                {(isBudgetModalOpen || isExpenseModalOpen) && (
                    <div className="modal-overlay">
                        {isBudgetModalOpen && (
                            <CreateBudgetForm onClose={() => setIsBudgetModalOpen(false)}/>
                        )}
                        {isExpenseModalOpen && (
                            <CreateExpenseForm onCreateExpense={handleCreateExpense} budgetId={budget.id} onClose={() => setIsExpenseModalOpen(false)}/>
                        )}
                    </div>
                )}


                <div className="expense-filters">
                    <ExpenseFilters activeBudgetId={budget.id} form={form} setForm={setForm} handleSearchByFilters={handleSearchByFilters}/>
                </div>


            <div className="budget-expense-container">
                    {expenses?.length > 0 ? (
                        expenses.map(expense => (
                            <div className="expense" key={expense.id}>
                                <div className="expense-info">
                                    <p>{expense.id}</p>
                                <p>{expense.name}</p>
                                <p className="category">{expense.category}</p>
                                </div>
                                <div className="info-and-options">
                                <p>{expense.amount}€</p>
                                <button className="btn-primary" onClick={() => handleExpenseDetail(expense)}>Details</button>
                                </div>
                            </div>
                            
                        ))
                    ):(
                        <p>Budget doesn't have expense</p>
                    )}
            </div>

            {isExpenseDetailsOpen && (
                <div className="modal-overlay">
                    <ExpenseDetails expense={expense} handleCLose={handleClose} onExpenseDelete={handleExpenseDelete}/>
                </div>
            )}
            </div>

        </div>
    )
}