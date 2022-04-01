import axios, {AxiosResponse} from 'axios'

const baseUrl: string = 'http://localhost:8000/api/todos'

export const getTodos = async (): Promise<ResponseDataType> => {
    try {
        const todos: AxiosResponse<ResponseDataType> = await axios.get(
            baseUrl
        )
        return todos.data;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getTodo = async (_id: string): Promise<ResponseDataType> => {
    try {
        const todo: AxiosResponse<ResponseDataType> = await axios.get(
            `${baseUrl}/${_id}`,
        )
        return todo.data;
    } catch (error: any) {
        throw new Error(error)
    }
}

export const createTodo = async (
    formData: Todo
): Promise<AxiosResponse<ResponseDataType>> => {
    try {
        const todo: Omit<Todo, '_id'> = {
            name: formData.name,
            description: formData.description,
            startDate: formData?.startDate,
            endDate: formData?.endDate,
        }
        const saveTodo: AxiosResponse<ResponseDataType> = await axios.post(
            baseUrl,
            todo
        )
        return saveTodo
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updateTodo = async (
    todo: Todo,
    config: any
): Promise<AxiosResponse<ResponseDataType>> => {
    try {
        const updatedTodo: AxiosResponse<ResponseDataType> = await axios.patch(
            `${baseUrl}/${todo._id}`, todo, config
        )
        return updatedTodo
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deleteTodo = async (
    _id: string
): Promise<AxiosResponse<ResponseDataType>> => {
    try {
        const deletedTodo: AxiosResponse<ResponseDataType> = await axios.delete(
            `${baseUrl}/${_id}`
        )
        return deletedTodo
    } catch (error: any) {
        throw new Error(error)
    }
}