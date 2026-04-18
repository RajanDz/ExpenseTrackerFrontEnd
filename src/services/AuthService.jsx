export const registerUser = async (data) => {
    const response = await fetch("https://expensetracker-production-0724.up.railway.app/api/auth/signup",{
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



export const loginUser = async (username,password) => {
    const response = await fetch(`https://expensetracker-production-0724.up.railway.app/api/auth/signin`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({username,password})
    })

    if(!response.ok){
        throw new Error("Wrong credentials")
    }
    const data = await response.json();
    alert("Successfully logged in");
    return data;
}

export const getUser = async (token) => {
    const response = await fetch(`https://expensetracker-production-0724.up.railway.app/api/user/me`,{
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

export const getBudget = async (token) => {
    const response = await fetch(`https://expensetracker-production-0724.up.railway.app/api/budget/getPrimaryBudget`,{
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
    console.log(`Budget data: ${data}`)
    return data;
}