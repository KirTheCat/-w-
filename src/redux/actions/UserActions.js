import { ADD_USER, REMOVE_USER, UPDATE_USER, SET_AUTHENTICATED_USER } from './types';

export const addUser = user => ({
    type: ADD_USER,
    payload: user,
});

export const removeUser = index => ({
    type: REMOVE_USER,
    payload: index,
});

export const updateUser = (index, user) => ({
    type: UPDATE_USER,
    payload: { index, user },
});

export const setAuthenticatedUser = user => ({
    type: SET_AUTHENTICATED_USER,
    payload: user,
});