import React, { FC, ReactElement } from 'react';
import Layout from '../../components/layouts';
import AppRouter from '../../router';

const App: FC = () => (
  <AppRouter>{(content: ReactElement) => <Layout>{content}</Layout>}</AppRouter>
);

export default App;
