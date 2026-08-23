import "../style/Dashboard.css";
import { ProgressBar } from "../components/ui/ProgressBar";
import { CreateExpenseForm } from "../components/expenses/CreateExpenseForm";
import { CreateBudgetForm } from "../components/budget/CreateBudgetForm";
import { ExpenseDetails } from "../components/expenses/ExpenseDetails";
import { getExpenseDetails, deleteExpense, getExpensesByFilters } from "../services/AuthService";
import { useEffect, useState } from "react";
import { useUser } from "../context/AuthContext";
import { useDashboard } from "../hooks/useDashboard";
import { ExpenseFilters } from "../components/expenses/ExpenseFilters";
import { useToast } from "../context/ToastContext";

export const DashboardPage = () => {
    const { token } = useUser();
    const { showToast } = useToast();
    const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [isExpenseDetailsOpen, setIsExpenseDetailOpen] = useState(false);
    const [expense, setExpense] = useState(null);
    const [page, setPage] = useState(0);

    const {
        budget,
        setExpenses,
        setTotalPages,
        expenses,
        totalPages,
        loading,
        error,
        createDashboardExpense,
        refreshDashboard
    } = useDashboard(token)

    const [form, setForm] = useState({
        budgetId: null,
        fromDate: "",
        toDate: "",
        category: "",
        amountSort: ""
    });

    useEffect(() => {
        if (budget) {
            setForm(prev => ({ ...prev, budgetId: budget.id }))
        }
    }, [budget])

    const handleSearchByFilters = async (currentPage = page) => {
        try {
            const data = await getExpensesByFilters(form, token, currentPage);
            if (data?.expenseList !== undefined) {
                setExpenses(data.expenseList);
                setTotalPages(data.totalPages);
            } else {
                setExpenses(data ?? []);
            }
        } catch (err) {
            showToast(err.message, 'error');
        }
    }

    useEffect(() => {
        if (page !== null && form.budgetId) {
            handleSearchByFilters(page);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleExpenseDetail = async (expense) => {
        if (!budget) return;
        try {
            setExpense(null);
            setIsExpenseDetailOpen(true);
            const data = await getExpenseDetails(token, expense.id, budget.id);
            setExpense(data);
        } catch (error) {
            showToast(error.message, 'error');
        }
    }

    const handleClose = () => {
        setIsExpenseDetailOpen(false);
    }

    const handleCreateExpense = async (token, expenseBody) => {
        try {
            await createDashboardExpense(expenseBody);
            showToast("Expense created!", 'success');
            setIsExpenseModalOpen(false);
            setPage(0);
        } catch (error) {
            showToast(error.message, 'error');
        }
    }

    const handleExpenseDelete = async (expenseId) => {
        try {
            await deleteExpense(token, expenseId);
            showToast("Expense deleted!", 'success');
            setIsExpenseDetailOpen(false);
            refreshDashboard(page);
        } catch (error) {
            showToast(error.message, 'error');
        }
    }

    if (!token) return <p className="login-msg">You need to login to access this resource...</p>
    if (loading && !budget) return <p className="loading-msg">Loading...</p>
    if (error) return <p className="loading-msg">Error: {error}</p>
    if (!budget) return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <div className="no-budget-container">
                    <h2>No active budget</h2>
                    <p>Create your first budget to get started.</p>
                    <button className="btn-primary" onClick={() => setIsBudgetModalOpen(true)}>Create Budget</button>
                </div>
                {isBudgetModalOpen && (
                    <div className="modal-overlay">
                        <CreateBudgetForm onClose={() => setIsBudgetModalOpen(false)} />
                    </div>
                )}
            </div>
        </div>
    );

    const spent = budget.budget - budget.remainingBudget;

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <div className="budget-container">
                    <div className="budget-info">
                        <div className="info">
                            <h3>{budget.name}</h3>
                            <span>{budget.budget}</span>
                        </div>
                    </div>
                    <ProgressBar spent={spent} total={budget.budget} />
                    <div className="budget-details">
                        <div className="detail">
                            <p>Spent</p>
                            <span>{spent}€</span>
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
                        <button
                            className="page-btn"
                            disabled={page === 0}
                            onClick={() => setPage(prev => Math.max(0, prev - 1))}
                        >&larr;</button>
                        <p>{page + 1} / {Math.max(totalPages, 1)}</p>
                        <button
                            className="page-btn"
                            disabled={page >= totalPages - 1}
                            onClick={() => setPage(prev => prev + 1)}
                        >&rarr;</button>
                    </div>
                </div>

                {(isBudgetModalOpen || isExpenseModalOpen) && (
                    <div className="modal-overlay">
                        {isBudgetModalOpen && (
                            <CreateBudgetForm onClose={() => setIsBudgetModalOpen(false)} />
                        )}
                        {isExpenseModalOpen && (
                            <CreateExpenseForm onCreateExpense={handleCreateExpense} budgetId={budget.id} onClose={() => setIsExpenseModalOpen(false)} />
                        )}
                    </div>
                )}

                <div className="expense-filters">
                    <ExpenseFilters activeBudgetId={budget.id} form={form} setForm={setForm} handleSearchByFilters={handleSearchByFilters} />
                </div>

                <div className="budget-expense-container">
                    {expenses?.length > 0 ? (
                        expenses.map(expense => (
                            <div className="expense" key={expense.id}>
                                <div className="expense-info">
                                    <p>{expense.id}</p>
                                    <p>{expense.name}</p>
                                    <span className="category">{expense.category}</span>
                                </div>
                                <div className="info-and-options">
                                    <p>{expense.amount}€</p>
                                    <button className="btn-primary" onClick={() => handleExpenseDetail(expense)}>Details</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Budget doesn't have any expenses</p>
                    )}
                </div>

                {isExpenseDetailsOpen && (
                    <div className="modal-overlay">
                        <ExpenseDetails expense={expense} handleCLose={handleClose} onExpenseDelete={handleExpenseDelete} />
                    </div>
                )}
            </div>
        </div>
    )
}
