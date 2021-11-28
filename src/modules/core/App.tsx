import React, { FC, ReactElement } from 'react';
import Layout from './layouts';
import AppRouter from '../../router';
import AppContextProvider from './AppContextProvider';
import LoginContextProvider from '../login/login.context';

const App: FC = () => (
  <AppContextProvider>
    <LoginContextProvider>
      <AppRouter>{(content: ReactElement) => <Layout>{content}</Layout>}</AppRouter>
    </LoginContextProvider>
  </AppContextProvider>
);

export default App;
