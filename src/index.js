import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import App from './components/App';
import { lightTheme, darkTheme, greenTheme, purpleTheme } from "./mui/theme";
import {CssBaseline} from "@mui/material";

const themeMap = {
    light: lightTheme,
    dark: darkTheme,
    green: greenTheme,
    purple: purpleTheme,
};
const Root = () => {
    const [themeName, setThemeName] = useState('light');

    const handleThemeChange = (event) => {
        setThemeName(event.target.value);
    };

    return (
        <Provider store={store}>
            <ThemeProvider theme={themeMap[themeName]}>
                <CssBaseline />
                <App handleThemeChange={handleThemeChange} themeName={themeName} />
            </ThemeProvider>
        </Provider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);
