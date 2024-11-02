import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {Box, TextField, Button, Alert} from '@mui/material';
import { setAuthenticatedUser } from '../redux/actions/AuthActions';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        if (username === '1' && password === '1') {
            localStorage.setItem('auth', 'true');
            setAlert(<Alert severity="success">Успешная авторизация</Alert>);
            dispatch(setAuthenticatedUser({ username, email: 'user@example.com' }));
            navigate('/');
        } else setAlert(<Alert severity="error">Неверный пароль</Alert>);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {alert}
            <TextField
                label="Имя Пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" color="customPurple" onClick={handleLogin}>
                Авторизоваться
            </Button>
        </Box>
    );
}

export default Login;