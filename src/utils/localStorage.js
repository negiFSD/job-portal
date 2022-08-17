// **** Below functions are resoponsible for local storage crud operation of user while loggin in and registering

export const addUserToLocalStorage = (user)=>{
    localStorage.setItem('user', JSON.stringify(user));
}

export const removeUserFromLocalStorage = ()=>{
    localStorage.removeItem('user')
}

export const getUserFromLocalStorage = ()=>{
    const result = localStorage.getItem('user')
    const user = result ? JSON.parse(result): null;
    return user
}

