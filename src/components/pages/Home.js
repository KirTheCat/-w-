import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';

const Home = () => {
    const { isAuthenticated, user } = useSelector(state => state.authState);

    return (
        <Container>
            {isAuthenticated ? (
                <>
                    <Typography variant="h4">Добро пожаловать, {user.username}</Typography>
                    {user.role === 'ROLE_ADMIN' ? (
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