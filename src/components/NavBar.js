import React from 'react';
import {AppBar, Toolbar, Typography, Button, Avatar, ButtonGroup} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {deepOrange} from "@mui/material/colors";

const AuthorizedBar = ({handleLogout}) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    sx={{ width: '175px'}}
                    variant="h6"
                >
                    Welcome
                </Typography>

                <ButtonGroup variant="outlined">
                    <Button color="inherit" component={Link} to="/">Главная</Button>
                    <Button color="inherit" component={Link} to="/secondary">Второстепенная</Button>
                </ButtonGroup>

                <Button sx={{ marginLeft: '340px'}} variant="outlined" color="inherit" onClick={handleLogout}>Выйти</Button>
                <Avatar sx={{ bgcolor: deepOrange[300] }}>К</Avatar>
            </Toolbar>
        </AppBar>
    )
}

const NotAuthorizedBar = ({handleLoginClick}) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    sx={{ width: '175px'}}
                    variant="h6"
                >
                    Not Welcome
                </Typography>

                <ButtonGroup variant="outlined">
                    <Button color="inherit" component={Link} to="/">Главная</Button>
                    <Button color="inherit" component={Link} to="/secondary">Второстепенная</Button>
                </ButtonGroup>

                <Button sx={{ marginLeft: '340px'}} variant="outlined" color="inherit" onClick={handleLoginClick}>Войти</Button>
            </Toolbar>
        </AppBar>
    )
}



const NavBar = ({ isAuthenticated, handleLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    if (location.pathname === '/login') {
        return null;
    }

    return isAuthenticated
        ? <AuthorizedBar handleLogout={handleLogout} />
        : <NotAuthorizedBar handleLoginClick={handleLoginClick} />;
};

export default NavBar;