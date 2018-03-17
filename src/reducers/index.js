import { combineReducers } from 'redux';
import UserReducer from '../reducers/user';

const reducers = {
    user: UserReducer,
};

export default combineReducers(reducers);
