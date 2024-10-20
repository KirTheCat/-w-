import {LOGOUT_USER, SET_AUTHENTICATED_USER } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: null
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
};

export default AuthReducer;
