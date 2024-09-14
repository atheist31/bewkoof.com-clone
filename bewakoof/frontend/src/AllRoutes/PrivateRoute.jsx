

import React from 'react'
import { useLocation ,Navigate} from 'react-router-dom'
import { getTokenFromCookies, isTokenExpired } from '../utils/token.utils'
import {useCustomToast} from '../Layout/useCustomToast'

const PrivateRoute = ({children}) => {
  
  const showToast=useCustomToast();
    const token=getTokenFromCookies();
    const isTokenExpire = isTokenExpired(token);
    const location=useLocation();
    
   if(isTokenExpire){
    showToast("Please Login First","error", 3000)
    return <Navigate to={"/user/login"} state={location.pathname} />
  }
  return children
}

export default PrivateRoute 