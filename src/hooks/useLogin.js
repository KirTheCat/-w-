import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setAuthenticatedUser} from '../redux/slicers/authSlice';
import {Alert} from '@mui/material';

import axios from 'axios';

const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async() => {
        let hasError = false;
        if (username.trim() === '') {
            setUsernameError(true);
            hasError = true;
        } else {
            setUsernameError(false);
        }

        if (password.trim() === '') {
            setPasswordError(true);
            hasError = true;
        } else {
            setPasswordError(false);
        }

        if (hasError) {
            setAlert(<Alert severity="error">Заполните все поля</Alert>);
            setTimeout(() => {
                setAlert(null);
            }, 2000);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/users/sign_in', {username, password});
            const {token, user} = response.data;
            localStorage.setItem('token', token);
            dispatch(setAuthenticatedUser(user));
            setAlert(<Alert severity="success">Успешная авторизация</Alert>);
            setTimeout(() => {
                setAlert(null);
                navigate('/');
            }, 100);
        } catch (error) {
            setAlert(<Alert severity="error">Неверный логин или пароль</Alert>);
            setTimeout(() => {
                setAlert(null);
            }, 2000);
        }
    };
    return {
        username,
        setUsername,
        password,
        setPassword,
        alert,
        handleLogin,
        usernameError,
        passwordError
    };
};

export default useLogin;
