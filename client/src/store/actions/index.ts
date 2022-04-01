import * as api from '../../api/TodoAPI';
import {
    GET_TODOS_REQUEST,
    GET_TODOS_SUCCESS,
    GET_TODOS_FAIL,

    GET_TODO_REQUEST,
    GET_TODO_SUCCESS,
    GET_TODO_FAIL,

    CREATE_TODO_REQUEST,
    CREATE_TODO_SUCCESS,
    CREATE_TODO_FAIL,

    UPDATE_TODO_REQUEST,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAIL,

    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAIL,
} from './types';

const config = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export const getTodosAction = () => async (dispatch) => {
    try {
        dispatch({type: GET_TODOS_REQUEST})

        const todos = await api.getTodos();

        dispatch({type: GET_TODOS_SUCCESS, payload: todos});
    } catch (error: any) {
        dispatch({
            type: GET_TODOS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
};

export const getTodoAction = (id) => async (dispatch) => {
    try {
        dispatch({type: GET_TODO_REQUEST})

        const data = await api.getTodo(id);

        dispatch({type: GET_TODO_SUCCESS, payload: data});
    } catch (error: any) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: GET_TODO_FAIL,
            payload: message
        })
    }
};

export const createTodoAction = (post) => async (dispatch) => {
    try {

        dispatch({type: CREATE_TODO_REQUEST})

        const data = await api.createTodo(post);

        dispatch({type: CREATE_TODO_SUCCESS, payload: data});
    } catch (error: any) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: CREATE_TODO_FAIL,
            payload: message,
        })
    }
};

export const updateTodoAction = (post) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_TODO_REQUEST})

        const data = await api.updateTodo(post, config);

        dispatch({type: UPDATE_TODO_SUCCESS, payload: data});
    } catch (error: any) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: UPDATE_TODO_FAIL,
            payload: message,
        })
    }
};

export const deleteTodoAction = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_TODO_REQUEST})

        await api.deleteTodo(id);
        dispatch({type: DELETE_TODO_SUCCESS, payload: id});
    } catch (error: any) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: DELETE_TODO_FAIL,
            payload: message,
        })
    }
};
