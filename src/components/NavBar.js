import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, ButtonGroup } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deepOrange } from "@mui/material/colors";

const NavBarContent = ({ isAuthenticated, handleLoginClick, handleLogout }) => (
    <AppBar position="static">
        <Toolbar>
            <Typography sx={{ width: '175px' }} variant="h6">
                {isAuthenticated ? "Welcome" : "Not Welcome"}
            </Typography>
            {!isAuthenticated && (
                <ButtonGroup variant="outlined">
                    <Button color="inherit" component={Link} to="/">Главная</Button>
                    <Button color="inherit" component={Link} to="/secondary">Второстепенная</Button>
                </ButtonGroup>
            )}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                {isAuthenticated ? (
                    <>
                        <Button sx={{ marginLeft: '20px' }} variant="outlined" color="inherit" onClick={handleLogout}>Выйти</Button>
                        <Avatar sx={{ bgcolor: deepOrange[300], marginLeft: '10px' }}>К</Avatar>
                    </>
                ) : (
                    <Button sx={{ marginRight: '40px' }} variant="outlined" color="inherit" onClick={handleLoginClick}>Войти</Button>
                )}
            </div>
        </Toolbar>
    </AppBar>
);

const NavBar = ({ isAuthenticated, handleLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    if (location.pathname === '/login') {
        return null;
    }

    return (
        <NavBarContent
            isAuthenticated={isAuthenticated}
            handleLoginClick={handleLoginClick}
            handleLogout={handleLogout}
        />
    );
};

export default NavBar;
