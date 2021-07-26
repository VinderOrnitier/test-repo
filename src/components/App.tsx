import React from 'react';
import TodoContainer from '../modules/todoList/containers/TodoList.container';
import UsersContainer from '../modules/userList/containers/UserList.container';

function App() {
  return (
    <div className="app">
      <header>Header Title</header>
      <UsersContainer />
      <TodoContainer />
    </div>
  );
}

export default App;
