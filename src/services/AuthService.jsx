const BASE_URL = "https://expensetracker-production-0724.up.railway.app";

export const registerUser = async (data) => {
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok){
        throw new Error("Error happen - Check your inputs and rules.")
    }
    alert(`Account created: ${data.name}`);
    return await response.json();
}

export const loginUser = async (username, password) => {
    const response = await fetch(`${BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })

    if(!response.ok){
        throw new Error("Wrong credentials")
    }
    const data = await response.json();
    alert("Successfully logged in");
    return data;
}

export const getUser = async (token) => {
    const response = await fetch(`${BASE_URL}/api/user/me`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    console.log("Token: ", token)
    if (!response.ok){
        throw new Error("Unauthorized")
    }
    return await response.text();
}
export const createBudget = async (form,token) => {
    const response = await fetch(`https://expensetracker-production-0724.up.railway.app/api/budget`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
            
        },
        body: JSON.stringify(form)
    });

    if (!response.ok){
        console.error(response.message);
        return;
    }

    console.log("Budget created");
}
export const getBudget = async (token) => {
    const response = await fetch(`${BASE_URL}/api/budget/getPrimaryBudget`, {
        method: 'GET',
        headers:{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if(!response.ok){
        throw new Error("Unathorized")
    }
    const data = await response.json();
    console.log(`Budget data: ${JSON.stringify(data)}`)
    return data;
}

export const fetchBudgetExpense = async (token, budgetId, page) => {
    console.log("I am called!");
    const response = await fetch(`${BASE_URL}/api/budget/budgetExpense/${budgetId}?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok){
        throw new Error(response.message);
    }

    const data = await response.json();
    console.log("Expense list: ", data);
    return data;
}

export const createExpense = async (token, exepenseBody) => {
    console.log("I am called.")
    const response = await fetch(`${BASE_URL}/api/expense`, {
        method: `POST`,
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(exepenseBody)
    })

    if (!response.ok) {
        console.error(response.message);
        return;
    }
    alert(`Expense is created`);
    fetchBudgetExpense(token, exepenseBody.budgetId);
}

export const getExpenseDetails = async (token, expenseId, budgetid) => {
    const response = await fetch(`${BASE_URL}/api/expense/${expenseId}/${budgetid}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok){
        console.error(response.message);
        return;
    }
    const data = await response.json();
    console.log("Expense details: ", data);
    return data;
}

export const deleteExpense = async (token, expenseId) => {
    const response = await fetch(`${BASE_URL}/api/expense/${expenseId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok){
        console.error(response.message);
    }
    alert('Expense deleted!');
}

export const getExpenseCategories = async (token) => {
    const response = await fetch(`${BASE_URL}/api/expense/getCategories`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok){
        console.error(response.message);
        return;
    }

    const data = await response.json();
    console.log("expense categories: ", data);
    return data;
}

export const getNonActiveBudgets = async (token, page) => {
    const response = await fetch(`${BASE_URL}/api/budget/nonActiveBudgets?page=${page}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok){
        console.error(response.message);
        return;
    }

    const data = await response.json();
    console.log("Non active budgets data: ", data.content);
    return data.content;
}

export const activateBudget = async (token,budgetId) => {
    const response = await fetch(`${BASE_URL}/api/budget/activateBudget/${budgetId}`,{
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok){
        console.error('Error happen while trying to activate budget!')
    }

    console.log("Budget activated!");
}

export const getExpensesByFilters = async (filtersForm,token,page) => {
        console.log("Current page", page)
        const response = await fetch(`${BASE_URL}/api/expense/searchByFilters?page=${page}`,{
            method: `POST`,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(filtersForm)
        })
        if (!response.ok){
            console.error("Error happen while trying to fetch expense with filters!");
            return;
        }
        const data = await response.json();
        console.log("Filters return: ", data);
        return data;
    }