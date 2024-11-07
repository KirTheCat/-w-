import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    ButtonGroup,
    Avatar,
    FormControl,
    Select,
    MenuItem,
    useTheme,
} from '@mui/material';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {deepOrange} from '@mui/material/colors';

const NavBarContent = ({isAuthenticated, handleLoginClick, handleLogout, handleThemeChange, themeName}) => {
        const theme = useTheme();
        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography sx={{width: '175px'}} variant="h6">
                        {isAuthenticated ? "Welcome" : "Not Welcome"}
                    </Typography>

                    <ButtonGroup variant="outlined">
                        <Button color="inherit" component={Link} to="/">Главная</Button>
                        <Button color="inherit" component={Link} to="/secondary">Второстепенная</Button>
                    </ButtonGroup>


                    {/** селектор тем **/}

                    <FormControl sx={{marginLeft: 'auto', marginRight: 2}}>
                        <Select
                            labelId="theme-select-label"
                            value={themeName}
                            onChange={handleThemeChange}
                            sx={{
                                '& .MuiSelect-select': {
                                backgroundColor: theme.palette.primary.select,
                                    color: theme.palette.primary.contrastText,
                                },
                                '& .MuiSelect-icon': { color: theme.palette.primary.contrastText, },
                            }}
                        >
                            <MenuItem value="light">Светлая</MenuItem>
                            <MenuItem value="dark">Тёмная</MenuItem>
                            <MenuItem value="green">Зелёная</MenuItem>
                            <MenuItem value="purple">Фиолетовая</MenuItem>
                        </Select>
                    </FormControl>

                    {/*** *** ***/}

                    <div style={{display: 'flex', alignItems: 'center'}}>
                        {isAuthenticated ? (
                            <>
                                <Button sx={{marginLeft: '20px'}} variant="outlined" color="inherit"
                                        onClick={handleLogout}>Выйти</Button>
                                <Avatar sx={{bgcolor: deepOrange[300], marginLeft: '10px'}}>К</Avatar>
                            </>
                        ) : (
                            <Button sx={{marginRight: '40px'}} variant="outlined" color="inherit"
                                    onClick={handleLoginClick}>Войти</Button>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
        );

    }
;

const NavBar = (props) => {
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
            {...props}
            handleLoginClick={handleLoginClick}
        />
    );
};

export default NavBar;
