import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Secondary from './pages/Secondary';
import AuthComponent from './AuthComponent';
import NavBar from './NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticatedUser, logoutUser } from '../redux/slicers/authSlice';

function App({ handleThemeChange, themeName }) {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.authState); // изменяем на authState
    const isAuthenticated = authState ? authState.isAuthenticated : false;
    const user = authState ? authState.user : null;

    useEffect(() => {
        console.log("Initial authState:", authState);
        const authStatus = localStorage.getItem('auth') === 'true';
        if (authStatus) {
            const user = JSON.parse(localStorage.getItem('user'));
            console.log("Setting authenticated user from localStorage:", user);
            dispatch(setAuthenticatedUser(user));
        }
    }, [dispatch]);

    useEffect(() => {
        console.log("Updated authState:", authState);
    }, [authState]);

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <BrowserRouter>
            <NavBar
                isAuthenticated={isAuthenticated}
                user={user}
                handleLogout={handleLogout}
                handleThemeChange={handleThemeChange}
                themeName={themeName}
            />
            <Routes>
                <Route path='/login' element={<AuthComponent />} />
                <Route path="/" element={<Home />} />
                <Route path="/secondary" element={<Secondary />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
