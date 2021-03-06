import { combineReducers } from 'redux';
import AuthenticationReducer from '../reducers/authentication';
import DashboardReducer from '../reducers/dashboard';
import ErrorReducer from '../reducers/error';
import ProgressReducer from '../reducers/progress';
import UserReducer from '../reducers/user';

const reducers = {
  authentication: AuthenticationReducer,
  dashboard: DashboardReducer,
  error: ErrorReducer,
  progress: ProgressReducer,
  user: UserReducer,
};

export default combineReducers(reducers);
