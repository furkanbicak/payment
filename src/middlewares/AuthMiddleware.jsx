import React                                from 'react'
import { useSelector }                      from 'react-redux';
import { Navigate, Outlet, useLocation }    from 'react-router-dom';

export const AuthMiddleware = () => {
    const location = useLocation();
    const { isLogin } = useSelector((store) => store.user)
    
    if (!isLogin && location.pathname !== "/") {
        return <Navigate to="/" replace/>
    }

    if(!isLogin && location.pathname === "/") 
    {
        return <Outlet />
    }

    if (isLogin && location.pathname === "/") {
        return <Navigate to="/package-list" replace />
    }
    return <Outlet />
}
