import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MediaPage from './pages/MediaPage';
import AuthComponent from './AuthComponent';
import NavBar from './navBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import {logoutUser } from '../redux/slicers/authSlice';
import MediaInfo from "./media/MediaInfo";
import UsersPage from "./pages/UsersPage";
import UserInfo from "./user/UserInfo";

function App({ handleThemeChange, themeName }) {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.authState);
    const isAuthenticated = authState ? authState.isAuthenticated : false;
    const user = authState ? authState.user : null;

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
                <Route path="/" element={<HomePage />} />
                <Route path="/media" element={<MediaPage />} />
                <Route path="/media/:id" element={<MediaInfo/>} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/:id" element={<UserInfo />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
