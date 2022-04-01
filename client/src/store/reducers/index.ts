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
    CREATE_TODO_RESET,
    UPDATE_TODO_REQUEST,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAIL,
    UPDATE_TODO_RESET,
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAIL,
} from '../actions/types';

export const todoListReducer = (state = {todos: []}, action) => {
    switch (action.type) {
        case GET_TODOS_REQUEST:
            return {loadingList: true, todos: []}
        case GET_TODOS_SUCCESS:
            return {
                loadingList: false,
                todosList: action.payload,
            }
        case GET_TODOS_FAIL:
            return {loadingList: false, error: action.payload}
        default:
            return state
    }
}

export const todoDetailsReducer = (
    state = {todo: []},
    action
) => {
    switch (action.type) {
        case GET_TODO_REQUEST:
            return {...state, loading: true}
        case GET_TODO_SUCCESS:
            return {loading: false, todo: action.payload}
        case GET_TODO_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


export const todoDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_TODO_REQUEST:
            return {loadingDelete: true}
        case DELETE_TODO_SUCCESS:
            return {loadingDelete: false, successDelete: true}
        case DELETE_TODO_FAIL:
            return {loadingDelete: false, error: action.payload}
        default:
            return state
    }
}

export const todoCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_TODO_REQUEST:
            return {loadingCreate: true}
        case CREATE_TODO_SUCCESS:
            return {loadingCreate: false, successCreate: true, todo: action.payload}
        case CREATE_TODO_FAIL:
            return {loadingCreate: false, error: action.payload}
        case CREATE_TODO_RESET:
            return {}
        default:
            return state
    }
}

export const todoUpdateReducer = (state = {todo: {}}, action) => {
    switch (action.type) {
        case UPDATE_TODO_REQUEST:
            return {loadingUpdate: true}
        case UPDATE_TODO_SUCCESS:
            return {loadingUpdate: false, successUpdate: true, todoUpdate: action.payload.data}
        case UPDATE_TODO_FAIL:
            return {loadingUpdate: false, error: action.payload}
        case UPDATE_TODO_RESET:
            return {todo: {}}
        default:
            return state
    }
}