/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import App  from "./src/router";
import configStore from './src/redux/ConfigureStore';
import { Provider } from 'react-redux';

const store = configStore();


export default () => (
    <Provider store={store}>
        <App />
    </Provider>
);