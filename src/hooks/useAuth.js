import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpUser, signInUser } from '../redux/slicers/authSlice';
import { Alert } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';

const useAuth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAuth = async (e) => {
        e.preventDefault();
        let hasError = false;

        if (username.trim() === '') {
            setUsernameError(true);
            hasError = true;
        } else {
            setUsernameError(false);
        }

        if (isSignUp && email.trim() === '') {
            setEmailError(true);
            hasError = true;
        } else {
            setEmailError(false);
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
            const data = isSignUp ? { username, email, password } : { username, password };
            if (isSignUp) {
                const signUpResult = await dispatch(signUpUser(data));
                const signUpUnwrapped = unwrapResult(signUpResult);
                // console.log("signUpUser result:", signUpUnwrapped);
                const signInResult = await dispatch(signInUser({ username, password }));
                const signInUnwrapped = unwrapResult(signInResult);
                // console.log("signInUser result:", signInUnwrapped);
                setAlert(<Alert severity="success">Успешная регистрация и авторизация</Alert>);
                setTimeout(() => {
                    setAlert(null);
                    console.log("Navigating to /");
                    navigate('/');
                }, 1000);
            } else {
                const signInResult = await dispatch(signInUser(data));
                const signInUnwrapped = unwrapResult(signInResult);
                // console.log("signInUser result:", signInUnwrapped);
                setAlert(<Alert severity="success">Успешная авторизация</Alert>);
                setTimeout(() => {
                    setAlert(null);
                    console.log("Navigating to /");
                    navigate('/');
                }, 1000);
            }
        } catch (error) {
            console.log("handleAuth error:", error);
            setAlert(<Alert severity="error">Ошибка при {isSignUp ? 'регистрации' : 'авторизации'}</Alert>);
            setTimeout(() => {
                setAlert(null);
            }, 2000);
        }
    };

    return {
        isSignUp,
        setIsSignUp,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        alert,
        handleAuth,
        usernameError,
        emailError,
        passwordError,
    };
};

export default useAuth;
