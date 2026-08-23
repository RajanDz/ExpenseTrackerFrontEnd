import { useEffect, useState } from "react"
import { createExpense, fetchBudgetExpense, getBudget } from "../services/AuthService";

export const useDashboard = (token) => {

    const [budget, setBudget] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadDashboard = async (page = 0) => {
        try {
            setLoading(true);
            setError(null);
            const budgetData = await getBudget(token);
            setBudget(budgetData);
            if (budgetData) {
                const expenseData = await fetchBudgetExpense(token, budgetData.id, page);
                setExpenses(expenseData.expenseList);
                setTotalPages(expenseData.totalPages);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const createDashboardExpense = async (expenseBody) => {
        try {
            setLoading(true);
            await createExpense(token, expenseBody);
            await loadDashboard(0);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!token) return;
        loadDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    return {
        budget,
        setExpenses,
        setTotalPages,
        expenses,
        totalPages,
        loading,
        error,
        createDashboardExpense,
        refreshDashboard: loadDashboard
    }
}
