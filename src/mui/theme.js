import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        action: {
            hover: '#f5f5f5',
        },
        customPurple: {
            main: '#9c27b0',
            contrastText: '#fff',
        },
        customRed:{
            main: '#c76767',
            contrastText: '#fff',
        },
        deleteColor:{
            main: '#FF6347',
         //   #E57373 (Light Coral)
            contrastText: '#fff',
        },
        editColor:{
            main: '#1E90FF',
            // #42A5F5 (Light Blue)
            contrastText: '#fff',
        },
    },
});

export default theme;
