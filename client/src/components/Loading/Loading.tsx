import React, {FC} from 'react';
import {CircularProgress} from "@chakra-ui/react";

const Loading: FC = () => <CircularProgress
    isIndeterminate
    size="24px"
    color="teal"/>;

export default Loading;