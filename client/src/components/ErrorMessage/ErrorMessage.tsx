import React, {FC} from 'react';
import {Alert, AlertDescription, AlertIcon, Box} from "@chakra-ui/react";

type Props = {
    message: string
}

const ErrorMessage: FC<Props> = ({message}) => {
    return (
        <Box my={4}>
            <Alert status="error" borderRadius={4}>
                <AlertIcon/>
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        </Box>
    );
}

export default ErrorMessage;