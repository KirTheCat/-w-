import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, Container, TextField} from "@mui/material";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === '1111') {
            localStorage.setItem('auth', 'true');
            navigate('/');
        } else {
            alert('Неверные данные для входа');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <form onSubmit={handleSubmit}>
            <div>
                <TextField
                    fullWidth
                    type="text"
                    label="Username"
                    margin="normal"
                    variant="outlined"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    margin="normal"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
            >
                Login
            </Button>

        </form>
</Container>
)
    ;
};

export default Login;