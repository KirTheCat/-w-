import { Box, TextField, Button} from '@mui/material';
import useLogin from '../hooks/useLogin';

const LoginComponent = () => {
    const { username, setUsername, password, setPassword, alert, handleLogin, usernameError, passwordError } = useLogin();

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {alert}
            <TextField
                label="Имя Пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                error={usernameError}
                helperText={usernameError ? "Имя пользователя не может быть пустым" : ""}
                style={{width: '300px'}}
            />
            <TextField
                label="Пароль"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                error={passwordError}
                helperText={passwordError ? "Пароль не может быть пустым" : ""}
                style={{width: '300px'}}
            />
            <Button variant="contained" color="customPurple" onClick={handleLogin}>
                Авторизоваться
            </Button>
        </Box>
    );
}

export default LoginComponent;
