import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MediaList from './pages/MediaList';
import AuthComponent from './AuthComponent';
import NavBar from './NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import {logoutUser } from '../redux/slicers/authSlice';
import MediaInfo from "./pages/MediaInfo";
import UsersTable from "./UsersTable";
import UserInfo from "./UserInfo";

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
                <Route path="/" element={<Home />} />
                <Route path="/media" element={<MediaList />} />
                <Route path="/media/:id" element={<MediaInfo/>} />
                <Route path="/users" element={<UsersTable />} />
                <Route path="/users/:id" element={<UserInfo />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
