import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { TextField, Button, Box } from '@mui/material';
import { setAuthenticatedUser } from '../redux/actions/UserActions';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        if (username === '1' && password === '1') {
            localStorage.setItem('auth', 'true');
            dispatch(setAuthenticatedUser({ username, email: 'user@example.com' }));
            navigate('/');
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
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