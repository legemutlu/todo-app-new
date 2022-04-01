import React, {useEffect} from 'react'
import TodoItem from '../../components/TodoItem'
import AddTodo from '../../components/AddTodo'
import {Heading} from '@chakra-ui/react'
import {VStack} from '@chakra-ui/react';
import {useDispatch, useSelector} from "react-redux";
import {createTodoAction, deleteTodoAction, getTodosAction, updateTodoAction} from "../../store/actions";
import {RootState} from "../../store";
import Loading from "../../components/Loading";

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = () => {
        dispatch(getTodosAction());
    };

    const todoListData = useSelector((state: RootState) => state.todoList);
    const {todosList, loadingList} = todoListData;

    const handleSaveTodo = async (e: React.FormEvent, formData: Todo): Promise<void> => {
        e.preventDefault()
        await dispatch(createTodoAction(formData));
        fetchTodos();
    }

    const handleUpdateTodo = async (todo: Todo): Promise<void> => {
        await dispatch(updateTodoAction(todo));
        fetchTodos();
    }

    const handleDeleteTodo = async (_id: string): Promise<void> => {
        await dispatch(deleteTodoAction(_id));
        fetchTodos();
    }

    return (
        <VStack p={1}>
            <Heading
                mb='8'
                fontWeight='extrabold'
                size='2xl'>
                TODO APP
            </Heading>
            <AddTodo createTodo={handleSaveTodo}/>
            {!loadingList ?
                <TodoItem todos={todosList} updateTodo={handleUpdateTodo} deleteTodo={handleDeleteTodo}/> :
                <Loading/>
            }
        </VStack>
    )
}

export default App