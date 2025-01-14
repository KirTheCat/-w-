import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBarContent from "./NavBarContent";

const NavBar = ({ isAuthenticated, user, handleLogout, handleThemeChange, themeName }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const userRole = useSelector(state => state.authState.user?.role);

    const handleLoginClick = () => {
        navigate('/login');
    };

    console.log("NavBar: isAuthenticated:", isAuthenticated, "user:", user);

    if (location.pathname === '/login') {
        return null;
    }

    return (
        <NavBarContent
            isAuthenticated={isAuthenticated}
            user={user}
            handleLoginClick={handleLoginClick}
            handleLogout={handleLogout}
            handleThemeChange={handleThemeChange}
            themeName={themeName}
            userRole={userRole}
        />
    );
};

export default NavBar;
