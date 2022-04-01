import React, {useState} from 'react'
import {
    Box,
    Button,
    Input,
    Flex,
    FormControl, FormLabel,
} from '@chakra-ui/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ErrorMessage from "./ErrorMessage";

type Props = {
    createTodo: (e: React.FormEvent, formData: Todo | any) => void,
}

const AddTodo: React.FC<Props> = ({createTodo}) => {
    const [content, setContent] = useState({
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date()
    });
    const [error, setError] = useState('');

    const onChange = e => {
        setContent({...content, [e.target.name]: e.target.value});
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (content.name === '' && content.description === '') {
            setError('Name or Description Can Not Be Empty!');
        } else {
            createTodo(e, content);
        }
    }

    return (
        <Flex width="full" align="center" justifyContent="center" my={25}>
            <Box
                p={8}
                maxWidth="600px"
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
                width='50%'
            >
                <Box my={2}>
                    <form onSubmit={handleSubmit}>
                        {error && <ErrorMessage message={error}/>}
                        <FormControl isRequired width='40%'>
                            <FormLabel>Todo Name</FormLabel>
                            <Input
                                size='lg'
                                placeholder='name'
                                name='name'
                                onChange={onChange}/>
                        </FormControl>

                        <FormControl isRequired width='40%'>
                            <FormLabel>Todo Description</FormLabel>
                            <Input
                                size='lg'
                                placeholder='description'
                                name='description'
                                onChange={onChange}/>
                        </FormControl>

                        <FormControl width='40%'>
                            <FormLabel>Start Date</FormLabel>
                            <DatePicker selected={content.startDate}
                                        onChange={(date: Date) => setContent({
                                            ...content,
                                            startDate: date
                                        })}
                                        minDate={new Date()}/>
                        </FormControl>
                        <FormControl width='40%'>
                            <FormLabel>End Date</FormLabel>
                            <DatePicker selected={content.endDate}
                                        onChange={(date: Date) => setContent({
                                            ...content,
                                            endDate: date
                                        })}
                                        minDate={content.startDate}/>
                        </FormControl>
                        <Button
                            type="submit"
                            width="full"
                            mt={4}
                            colorScheme='pink'
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    )
}

export default AddTodo