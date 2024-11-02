import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#ff4081',
        },
        action: {
            hover: '#e0e0e0',
        },
        customPurple: {
            main: '#ba68c8',
            contrastText: '#ffffff',
        },
        deleteColor: {
            main: '#f44336',
            contrastText: '#ffffff',
        },
        editColor: {
            main: '#1976d2',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8f2f2',
            alternate: '#d0cfcf',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc',
        },
        secondary: {
            main: '#03dac6',
        },
        customPurple: {
            main: '#bb86fc',
            contrastText: '#000000',
        },
        deleteColor: {
            main: '#f44336',
            contrastText: '#000000',
        },
        editColor: {
            main: '#42a5f5',
            contrastText: '#000000',
        },
        background: {
            default: '#121212',
            alternate: '#1f1f1f',
        },
    },
});

const greenTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#66bb6a',
        },
        secondary: {
            main: '#a5d6a7',
        },
        customPurple: {
            main: '#66bb6a',
            contrastText: '#ffffff',
        },
        deleteColor: {
            main: '#f44336',
            contrastText: '#ffffff',
        },
        editColor: {
            main: '#42a5f5',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f1f8e9',
            alternate: '#e8f5e9',
        },
    },
});

const purpleTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ab47bc',
        },
        secondary: {
            main: '#ce93d8',
        },
        customPurple: {
            main: '#ab47bc',
            contrastText: '#ffffff',
        },
        deleteColor: {
            main: '#f44336',
            contrastText: '#ffffff',
        },
        editColor: {
            main: '#42a5f5',
            contrastText: '#ffffff',
        },
        background: {
            default: '#e6e6fa',
            alternate: '#e1bee7',
        },

    },
});

export { lightTheme, darkTheme, greenTheme, purpleTheme };
