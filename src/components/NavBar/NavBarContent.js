import React, { useState } from 'react';
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
    Menu,
    IconButton,
    useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { deepOrange } from '@mui/material/colors';

const NavBarContent = ({ isAuthenticated, handleLoginClick, handleLogout, handleThemeChange, themeName, user = { username: 'User', email: '' }, userRole }) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const firstLetter = user?.username?.charAt(0)?.toUpperCase() || 'U';

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    console.log("NavBarContent: isAuthenticated:", isAuthenticated, "user:", user);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography sx={{ width: '175px' }} variant="h6">
                    {isAuthenticated ? "Welcome" : "Not Welcome"}
                </Typography>

                <ButtonGroup variant="outlined">
                    <Button color="inherit" component={Link} to="/">Главная</Button>
                    <Button color="inherit" component={Link} to="/media">Медиа</Button>
                    {userRole === 'ROLE_ADMIN' && (
                        <Button color="inherit" component={Link} to="/users">Пользователи</Button>
                    )}
                </ButtonGroup>

                <FormControl sx={{ marginLeft: 'auto', marginRight: 2 }}>
                    <Select
                        labelId="theme-select-label"
                        value={themeName}
                        onChange={handleThemeChange}
                        sx={{
                            '& .MuiSelect-select': {
                                backgroundColor: theme.palette.primary.select,
                                color: theme.palette.primary.contrastText,
                            },
                            '& .MuiSelect-icon': { color: theme.palette.primary.contrastText },
                        }}
                    >
                        <MenuItem value="light">Светлая</MenuItem>
                        <MenuItem value="dark">Тёмная</MenuItem>
                        <MenuItem value="green">Зелёная</MenuItem>
                        <MenuItem value="purple">Фиолетовая</MenuItem>
                    </Select>
                </FormControl>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {isAuthenticated ? (
                        <>
                            <Button sx={{ marginLeft: '20px' }} variant="outlined" color="inherit" onClick={handleLogout}>
                                Выйти
                            </Button>
                            <IconButton onClick={handleMenuOpen}>
                                <Avatar sx={{ bgcolor: deepOrange[300], marginLeft: '10px' }}>
                                    {firstLetter}
                                </Avatar>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem>{user.username || 'User'}</MenuItem>
                                <MenuItem>{user.email || ''}</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button sx={{ marginRight: '40px' }} variant="outlined" color="inherit" onClick={handleLoginClick}>
                            Войти
                        </Button>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavBarContent;
