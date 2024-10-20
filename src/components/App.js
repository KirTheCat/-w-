import React, {useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../components/Home';
import Secondary from '../components/Secondary';
import Login from '../components/Login';
import NavBar from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticatedUser, logoutUser } from '../redux/actions/AuthActions';

function App() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.authState.isAuthenticated);

    useEffect(() => {
        const authStatus = localStorage.getItem('auth') === 'true';
        if (authStatus) {
            dispatch(setAuthenticatedUser({ username: 'admin', email: 'user@example.com' }));
        }
    }, [dispatch]);

    const handleLogout = () => {
        localStorage.setItem('auth', 'false');
        dispatch(logoutUser());
    };

    return (
        <BrowserRouter>
            <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path="/" element= {<Home/> }/>
                <Route path="/secondary" element={<Secondary/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;