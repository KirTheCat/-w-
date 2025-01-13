import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Container, Typography, Card, CardContent, CircularProgress, Backdrop} from '@mui/material';
import instance from "../config/axios";
import {useSelector} from "react-redux";

const UserInfo = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const isAuthenticated = useSelector(state => state.authState.isAuthenticated);
    const userRole = useSelector(state => state.authState.user?.role);

    useEffect(() => {
    if (isAuthenticated && userRole === 'ROLE_ADMIN') {
        const fetchUser = async () => {
            try {
                const response = await instance.get(`/users/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }
}, [isAuthenticated, userRole, id]);

    if (!user) {
        return <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        >
            <CircularProgress color="success" />
        </Backdrop>
    }

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h5">Досье на пользователя</Typography>
                    <Typography>ID: {user.id}</Typography>
                    <Typography>Username: {user.username}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Role: {user.role}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default UserInfo;
