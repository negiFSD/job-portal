import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectedRoute({children}) {
const {user}= useSelector((store)=>store.user)
// console.log(user)
if(!user){
    return( <Navigate to='/landing'/>)
}
return children  
}

export default ProtectedRoute