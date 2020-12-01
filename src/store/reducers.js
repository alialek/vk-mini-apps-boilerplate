import { combineReducers } from 'redux';
import { dataReducer } from './data/reducers.js';

export default combineReducers({
    data: dataReducer,
});
