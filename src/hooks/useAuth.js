import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpUser, signInUser } from '../redux/slicers/authSlice';
import { Alert } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';

const useAuth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAuth = async (values, { setSubmitting }) => {
        const { username, email, password } = values;

        try {
            const data = isSignUp ? { username, email, password } : { username, password };
            if (isSignUp) {
                const signUpResult = await dispatch(signUpUser(data));
                unwrapResult(signUpResult);
                const signInResult = await dispatch(signInUser({ username, password }));
                unwrapResult(signInResult);
                setAlert(<Alert severity="success">Успешная регистрация и авторизация</Alert>);
                setTimeout(() => {
                    setAlert(null);
                    navigate('/');
                }, 1000);
            } else {
                const signInResult = await dispatch(signInUser(data));
                unwrapResult(signInResult);
                setAlert(<Alert severity="success">Успешная авторизация</Alert>);
                setTimeout(() => {
                    setAlert(null);
                    navigate('/');
                }, 1000);
            }
        } catch (error) {
            setAlert(<Alert severity="error">Ошибка при {isSignUp ? 'регистрации' : 'авторизации'}</Alert>);
            setTimeout(() => {
                setAlert(null);
            }, 2000);
        }
        setSubmitting(false);
    };

    return {
        isSignUp,
        setIsSignUp,
        alert,
        handleAuth,
    };
};

export default useAuth;
