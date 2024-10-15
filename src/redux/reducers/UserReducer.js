import { ADD_USER, REMOVE_USER, UPDATE_USER, SET_AUTHENTICATED_USER } from '../actions/types';

const initialState = {
    users: [
        {name: 'Иван', last_name: 'Петров', email: 'i_Petrov@example.com'},
        {name: 'Петр', last_name: 'Иванов', email: 'P_Ivanov@example.com'},
        {name: 'Марк', last_name: 'Аврээлиев', email: 'MarkusBigDick_23@example.com'},
        {name: 'Геннадий', last_name: 'Цидармян', email: 'Gennius89@example.com'},
        {name: 'Дмитрий', last_name: 'Укулелеевич', email: 'Dulaboba1997@example.com'},
        {name: 'Марк', last_name: 'Карлс', email: 'Jsdc75_nagibator_23@example.com'}
    ],
    authenticatedUser: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter((_, index) => index !== action.payload)
            };
        case UPDATE_USER:
            const updatedUsers = [...state.users];
            updatedUsers[action.payload.index] = action.payload.user;
            return {
                ...state,
                users: updatedUsers
            };
        case SET_AUTHENTICATED_USER:
            return {
                ...state,
                authenticatedUser: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;