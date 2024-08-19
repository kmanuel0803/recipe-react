
import { combineReducers } from 'redux';
import paginationReducer from './paginationSlice';

export const rootReducer = combineReducers({
  pagination: paginationReducer,
});