import { combineReducers } from 'redux';
import userReducer from '../slicers/userSlice';
import authReducer from "../slicers/authSlice";

const rootReducer = combineReducers({
    userState: userReducer,
    authState: authReducer,
});

export default rootReducer;