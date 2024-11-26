import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarContent from './NavBarContent';

const NavBar = ({ isAuthenticated, user, handleLogout, handleThemeChange, themeName }) => {
    const location = useLocation();
    const navigate = useNavigate();

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
        />
    );
};

export default NavBar;
