import { createSlice } from '@reduxjs/toolkit';

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

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        removeUser: (state, action) => {
            state.users = state.users.filter((_, index) => index !== action.payload);
        },
        updateUser: (state, action) => {
            const { index, user } = action.payload;
            state.users[index] = user;
        }
    }
});

export const { addUser, removeUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
