import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {API_BASE_URL} from '../../config/ApiConfig'

// Асинхронные действия для работы с аутентификацией
export const signUpUser = createAsyncThunk('auth/signUpUser', async (user, { rejectWithValue }) => {
    try {

        const response = await axios.post(`${API_BASE_URL}/users/sign_up`, user);
        console.log("signUpUser response data:", response.data);
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const signInUser = createAsyncThunk('auth/signInUser', async (credentials, { rejectWithValue }) => {
    try {

        const response = await axios.post(`${API_BASE_URL}/users/sign_in`, credentials);
        console.log("signInUser response data:", response.data);
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticatedUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem('auth', 'true');
            localStorage.setItem('user', JSON.stringify(action.payload));
            console.log("setAuthenticatedUser:", state);
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('auth');
            localStorage.removeItem('user');
            console.log("logoutUser:", state);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                localStorage.setItem('auth', 'true');
                localStorage.setItem('user', JSON.stringify(action.payload));
                console.log("signUpUser fulfilled: state:", state);
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log("signUpUser rejected: error:", action.payload);
            })
            .addCase(signInUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                localStorage.setItem('auth', 'true');
                localStorage.setItem('user', JSON.stringify(action.payload));
                console.log("signInUser fulfilled: state:", state);
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.log("signInUser rejected: error:", action.payload);
            });
    }
});

export const { setAuthenticatedUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
