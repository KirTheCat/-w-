import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import authReducer from "./AuthReducer";

const rootReducer = combineReducers({
    userState: userReducer,
    authState: authReducer,
});

export default rootReducer;