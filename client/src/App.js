import React from 'react';
import InputTodo from './components/InputTodo.js';
import ListTodos from './components/ListTodos.js';
import './App.css';

function App() {
  return (
    <div className='m-5'>
      <InputTodo />
      <ListTodos/>
    </div>
  );
}

export default App;
