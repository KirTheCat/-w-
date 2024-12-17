import React from 'react';
import { Box, TextField, Button, FormControlLabel, Switch } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';

const AuthComponent = () => {
    const {
        isSignUp,
        setIsSignUp,
        alert,
        handleAuth,
        usernameError,
        emailError,
        passwordError,
    } = useAuth();

    const handleToggle = () => {
        setIsSignUp(!isSignUp);
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Имя пользователя не может быть пустым'),
        email: isSignUp
            ? Yup.string().email('Неверный email').required('Email не может быть пустым')
            : Yup.string().nullable(),
        password: Yup.string().required('Пароль не может быть пустым'),
    });

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {alert}
            <FormControlLabel
                control={<Switch checked={isSignUp} onChange={handleToggle} />}
                label={isSignUp ? 'Зарегистрироваться' : 'Авторизоваться'}
            />
            <Formik
                initialValues={{ username: '', email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleAuth}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field
                            as={TextField}
                            label="Имя Пользователя"
                            name="username"
                            margin="normal"
                            fullWidth
                            error={touched.username && !!errors.username}
                            helperText={touched.username && errors.username}
                        />
                        {isSignUp && (
                            <Field
                                as={TextField}
                                label="Email"
                                name="email"
                                margin="normal"
                                fullWidth
                                error={touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                            />
                        )}
                        <Field
                            as={TextField}
                            label="Пароль"
                            name="password"
                            type="password"
                            margin="normal"
                            fullWidth
                            error={touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                        />
                        <Button type="submit" variant="contained" color="customPurple">
                            {isSignUp ? 'Зарегистрироваться' : 'Авторизоваться'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default AuthComponent;
