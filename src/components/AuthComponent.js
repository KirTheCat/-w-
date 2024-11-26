import React from 'react';
import { Box, TextField, Button, FormControlLabel, Switch } from '@mui/material';
import useAuth from "../hooks/useAuth";

const AuthComponent = () => {
    const {
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
    } = useAuth();

    const handleToggle = () => {
        setIsSignUp(!isSignUp);
        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {alert}
            <FormControlLabel
                control={<Switch checked={isSignUp} onChange={handleToggle} />}
                label={isSignUp ? "Зарегистрироваться" : "Авторизоваться"}
            />
            <form onSubmit={handleAuth}>
                <TextField
                    label="Имя Пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    required
                    error={usernameError}
                    helperText={usernameError ? "Имя пользователя не может быть пустым" : ""}
                    style={{ width: '300px' }}
                />
                {isSignUp && (
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        required
                        error={emailError}
                        helperText={emailError ? "Email не может быть пустым" : ""}
                        style={{ width: '300px' }}
                    />
                )}
                <TextField
                    label="Пароль"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                    error={passwordError}
                    helperText={passwordError ? "Пароль не может быть пустым" : ""}
                    style={{ width: '300px' }}
                    autoComplete="current-password"
                />
                <Button type="submit" variant="contained" color="customPurple">
                    {isSignUp ? "Зарегистрироваться" : "Авторизоваться"}
                </Button>
            </form>
        </Box>
    );
};

export default AuthComponent;
