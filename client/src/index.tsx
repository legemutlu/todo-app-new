import React, {FunctionComponent} from 'react';
import * as ReactDOMClient from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {Provider} from 'react-redux';

import './index.css';

import App from './App';
import store from "./store";

const Root: FunctionComponent = () => (
    <Provider store={store}>
        <BrowserRouter>
            <ChakraProvider>
                <App/>
            </ChakraProvider>
        </BrowserRouter>
    </Provider>
);

const rootElement = document.getElementById('root');
const root = rootElement ? ReactDOMClient.createRoot(rootElement) : null;

if (root) root.render(<Root/>);