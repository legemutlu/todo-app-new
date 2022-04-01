import React, {useState} from 'react'
import {
    HStack,
    VStack,
    Text,
    IconButton,
    StackDivider,
    Spacer,
    Badge,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    ModalFooter,
    Button,
} from '@chakra-ui/react';
import {FaTrash, FaPen, FaCheck, FaWindowClose} from "react-icons/fa";
import DatePicker from "react-datepicker";


type Props = TodoProps & {
    todos: Todo[],
    updateTodo: (todo) => void
    deleteTodo: (_id: string) => void
}

const TodoItem: React.FC<Props> = ({todos, updateTodo, deleteTodo}) => {
    const [modalValue, setModalValue] = useState({
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date()
    })

    const [isOpen, setIsOpen] = useState(false)

    const onChange = e => {
        setModalValue({...modalValue, [e.target.name]: e.target.value});
    };

    function onClose() {
        setIsOpen(false)
    }

    function handleEditSubmit(e) {
        e.preventDefault();
        updateTodo(modalValue)
        setIsOpen(false)
    }

    function handleEditClick(todo) {
        setIsOpen(true)
        setModalValue({
            ...todo,
            name: todo.name,
            description: todo.description,
            startDate: new Date(todo.startDate),
            endDate: new Date(todo.endDate)
        })
    }

    const handleStatusEditClick = (e, todo) => {
        e.preventDefault();
        if (todo.status === 'incomplete') {
            updateTodo({...todo, status: 'complete'});
        } else {
            updateTodo({...todo, status: 'incomplete'});
        }
    }

    return (
        <VStack
            divider={<StackDivider/>}
            borderColor='gray.100'
            borderWidth='2px'
            p='4'
            borderRadius='lg'
            w='100%'
            maxW={{base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw'}}
            alignItems='stretch'
        >
            {todos && todos.length > 0 && todos.map((todo) => (
                <HStack key={todo._id}>
                    <Heading fontSize='xl'>{todo.name}</Heading>
                    <Text mt={4}>{todo.description}</Text>
                    <Text mt={4}
                          color='blue.500'
                          fontSize='xs'>{todo.startDate && todo.endDate ? `${new Date(todo.endDate).getDate() - new Date().getDate()} days remain` : ''}</Text>
                    <Spacer/>
                    <Badge m='15' fontSize='0.8em' colorScheme={todo.status === 'incomplete' ? 'red' : 'green'}>
                        {todo.status}
                    </Badge>
                    <Spacer/>
                    <IconButton
                        color={todo.status === 'incomplete' ? 'green.500' : 'red.500'}
                        icon={todo.status === 'incomplete' ? <FaCheck/> : <FaWindowClose/>}
                        isRound={true}
                        onClick={(e) => handleStatusEditClick(e, todo)}
                        aria-label={"lege"}/>
                    <IconButton
                        color="blue.500"
                        icon={<FaPen/>}
                        isRound={true}
                        onClick={() => handleEditClick(todo)}
                        aria-label={"lege"}/>
                    <IconButton
                        color="red.500"
                        icon={<FaTrash/>}
                        isRound={true}
                        onClick={() => deleteTodo(todo._id)}
                        aria-label={"lege"}/>

                    {/* modal for editing a todo */}
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader>Edit Your Todo</ModalHeader>
                            <ModalCloseButton/>
                            <form onSubmit={handleEditSubmit}>
                                <ModalBody>
                                    Name: <Input
                                    name="name"
                                    value={modalValue.name}
                                    variant="outline"
                                    type="text"
                                    placeholder="name"
                                    onChange={onChange}/>
                                    Description: <Input
                                    name="description"
                                    value={modalValue.description}
                                    variant="outline"
                                    type="text"
                                    placeholder="description"
                                    onChange={onChange}/>
                                    Start Date: <DatePicker selected={modalValue.startDate}
                                                            onChange={(date: Date) => setModalValue({
                                                                ...modalValue,
                                                                startDate: date
                                                            })}
                                                            minDate={new Date()}/>
                                    End Date: <DatePicker selected={modalValue.endDate}
                                                          onChange={(date: Date) => setModalValue({
                                                              ...modalValue,
                                                              endDate: date
                                                          })}
                                                          minDate={modalValue.startDate}/>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme="teal" mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                    <Button type="submit" colorScheme="teal" mr={3}>
                                        Update
                                    </Button>
                                </ModalFooter>
                            </form>

                        </ModalContent>
                    </Modal>
                </HStack>
            ))}
        </VStack>
    )
}

export default TodoItem