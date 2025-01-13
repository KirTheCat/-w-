import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from "../../config/axios";
import { jwtDecode } from "jwt-decode";

export const signUpUser = createAsyncThunk('auth/signUpUser', async (user, { rejectWithValue }) => {
    try {
        const response = await instance.post('/users/sign_up', user);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Registration failed");
    }
});

export const signInUser = createAsyncThunk('auth/signInUser', async (credentials, { rejectWithValue }) => {
    try {
        const response = await instance.post('/users/sign_in', credentials);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Login failed");
    }
});

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const decodedToken = jwtDecode(action.payload.accessToken);
                console.log("Decoded Token:", decodedToken);
                const user = {
                    username: decodedToken.username,
                    email: decodedToken.email,
                    role: decodedToken.role,
                    accessToken: action.payload.accessToken
                };
                state.user = user;
                state.isAuthenticated = true;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const decodedToken = jwtDecode(action.payload.accessToken);
                console.log("Decoded Token:", decodedToken);
                const user = {
                    username: decodedToken.username,
                    email: decodedToken.email,
                    role: decodedToken.role,
                    accessToken: action.payload.accessToken
                };
                state.user = user;
                state.isAuthenticated = true;
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;