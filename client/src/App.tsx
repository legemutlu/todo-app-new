import {hot} from 'react-hot-loader/root';
import React, {FC} from 'react';

import Routes from './routes';

const App: FC = () => (
    <>
        <Routes/>
    </>
);

export default hot(App);