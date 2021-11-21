import React from 'react';
import { Provider } from 'react-redux';

import { setupStore } from '../../store'

import App from './App';

const store = setupStore();

export default function Root() {
  return (
    <Provider store={store}>
        <App />
    </Provider>
  );
}