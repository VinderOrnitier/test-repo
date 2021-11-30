import React from 'react';
import {ErrorBoundary} from 'react-error-boundary'
import { Provider } from 'react-redux';

import { setupStore } from '../../store'

import App from './App';

const store = setupStore();

function ErrorFallback({error}: any) {
  return (
    <div role="alert" className="p-10">
      <h1 className="text-2xl font-bold text-center mb-8">Something went wrong:</h1>
      <pre className="whitespace-normal">{error.message}</pre>
      <p className="font-bold mt-8">Please try it later</p>
    </div>
  )
}

export default function Root() {
  return (
    <Provider store={store}>
      <ErrorBoundary FallbackComponent={ErrorFallback} >
        <App />
      </ErrorBoundary>
    </Provider>
  );
}