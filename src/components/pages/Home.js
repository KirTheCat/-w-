import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';

const Home = () => {
    const isAuthenticated = useSelector(state => state.authState.isAuthenticated);
    const user = useSelector(state => state.authState.user);
    const userRole = user?.role;
    const username = user?.username;

    return (
        <Container>
            {isAuthenticated ? (
                <>
                    <Typography variant="h4">Добро пожаловать, {username}</Typography>
                    {userRole === 'ROLE_ADMIN' ? (
                        <Typography variant="h6">Вы авторизованы как администратор</Typography>
                    ) : (
                        <Typography variant="h6">Привет, авторизованный пользователь</Typography>
                    )}
                </>
            ) : (
                <Typography variant="h6">Пожалуйста, авторизуйтесь</Typography>
            )}
        </Container>
    );
};

export default Home;
