import { useEffect, useState } from "react"
import { createExpense, fetchBudgetExpense, getBudget } from "../services/AuthService";

export const useDashboard = (token,page) => {

    const [budget,setBudget] = useState(null);
    const [expenses,setExpenses] = useState([]);

    const [totalPages,setTotalPages] = useState(0);

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);


    const loadDashboard = async (page) => {
        try {
            setLoading(true);
            const budgetData = await getBudget(token);
            setBudget(budgetData);

            const expenseData = await fetchBudgetExpense(token,budgetData.id,page);
            setExpenses(expenseData.expenseList);
            console.log("Expense data: ", expenseData);
            setTotalPages(expenseData.totalPages);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

     const createDashboardExpense = async (expenseBody) => {
        console.log(expenseBody);
        try {
            setLoading(true);
            const expenseRequest = await createExpense(token,expenseBody);
            loadDashboard();
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false)
        }
    }

    
    useEffect(() => {
        if(!token) return

        loadDashboard();
    },[token])
    return{
        budget,
        setExpenses,
        expenses,
        totalPages,
        loading,
        error,
        createDashboardExpense,
        refreshDashboard: loadDashboard
    }
}