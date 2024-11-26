import { combineReducers } from 'redux';
import authReducer from "../slicers/authSlice";

const rootReducer = combineReducers({
    authState: authReducer,
});

export default rootReducer;
