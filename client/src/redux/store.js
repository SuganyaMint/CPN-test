import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { PropertyReducers } from './reducers/PropertyReducers';
import { UserReducers } from './reducers/UserReducers';

const rootReducer = combineReducers({
  properties: PropertyReducers,
  user: UserReducers,

});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;