import {BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Home from "./components/Home";
import Login from "./components/Login";
import {useEffect} from "react";

function App() {
    useEffect(() => {
            localStorage.setItem('auth', 'false');
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login/>} path='/login'/>
                <Route element={<ProtectedRoutes/>}>
                    <Route element={<Home/>} path="/"/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
