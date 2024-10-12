import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Alert, Button, Container, TextField} from "@mui/material";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '1' && password === '1') {
            localStorage.setItem('auth', 'true');
            navigate('/');
        } else {
            setAlert(<Alert severity="info">Неверные данные для входа</Alert>);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            {alert}
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
    );
};

export default Login;
