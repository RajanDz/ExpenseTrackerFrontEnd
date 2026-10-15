const BASE_URL = process.env.REACT_APP_BASE_URL;

export const registerUser = async (data) => {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error("Check your inputs and try again.");
    return await response.json();
}

export const loginUser = async (username, password) => {
    const response = await fetch(`${BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) throw new Error("Wrong credentials.");
    return await response.json();
}

export const getUser = async (token) => {
    const response = await fetch(`${BASE_URL}/api/user/me`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Unauthorized");
    return await response.text();
}

export const createBudget = async (form, token) => {
    const response = await fetch(`${BASE_URL}/api/budget`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
    });
    if (!response.ok) throw new Error("Failed to create budget.");
}

export const getBudget = async (token) => {
    const response = await fetch(`${BASE_URL}/api/budget/getPrimaryBudget`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Unauthorized");
    return await response.json();
}

export const fetchBudgetExpense = async (token, budgetId, page) => {
    const response = await fetch(`${BASE_URL}/api/budget/budgetExpense/${budgetId}?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to fetch expenses.");
    return await response.json();
}

export const createExpense = async (token, expenseBody) => {
    const response = await fetch(`${BASE_URL}/api/expense`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(expenseBody)
    });
    if (!response.ok) throw new Error("Failed to create expense.");
}

export const getExpenseDetails = async (token, expenseId, budgetId) => {
    const response = await fetch(`${BASE_URL}/api/expense/${expenseId}/${budgetId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to load expense details.");
    return await response.json();
}

export const deleteExpense = async (token, expenseId) => {
    const response = await fetch(`${BASE_URL}/api/expense/${expenseId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Failed to delete expense.");
}

export const getExpenseCategories = async (token) => {
    const response = await fetch(`${BASE_URL}/api/expense/getCategories`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to load categories.");
    return await response.json();
}

export const getNonActiveBudgets = async (token, page) => {
    const response = await fetch(`${BASE_URL}/api/budget/nonActiveBudgets?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to load budgets.");
    const data = await response.json();
    return data.content;
}

export const activateBudget = async (token, budgetId) => {
    const response = await fetch(`${BASE_URL}/api/budget/activateBudget/${budgetId}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) throw new Error("Failed to activate budget.");
}

export const getExpensesByFilters = async (filtersForm, token, page) => {
    const response = await fetch(`${BASE_URL}/api/expense/searchByFilters?page=${page}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(filtersForm)
    });
    if (!response.ok) throw new Error("Failed to search expenses.");
    return await response.json();
}
