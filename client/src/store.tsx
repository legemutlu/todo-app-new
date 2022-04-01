import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import {combineReducers} from 'redux';

import {
    todoListReducer,
    todoDetailsReducer,
    todoDeleteReducer,
    todoCreateReducer,
    todoUpdateReducer,
} from './store/reducers';

const reducer = combineReducers({
    todoList: todoListReducer,
    todoDetails: todoDetailsReducer,
    todoDelete: todoDeleteReducer,
    todoCreate: todoCreateReducer,
    todoUpdate: todoUpdateReducer
});

const store = createStore(reducer, {}, applyMiddleware(reduxThunk));

export default store;

export type RootState = ReturnType<typeof reducer>