import React, { useState } from 'react'
import './Todolist.css'
import hedgehogImage from './img/pngtree-hedgehog-animal-cartoon-image-png-image_15425813.png';

export default function Todolist() {
  const [todos, setTodo] = useState([]);
  const [todosDelete, setTodoDelete] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo) {
      setTodo([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const DeleteTodo = (index) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");
    if (confirmed) {
      const updatedTodos = todos.filter((_, i) => i !== index);
      setTodo(updatedTodos);
      
      // Ajouter la tâche supprimée à todosDelete
      const todoToDelete = todos[index];
      setTodoDelete([...todosDelete, todoToDelete]);

      // Supprimer définitivement la tâche après 2 minutes
      setTimeout(() => {
        setTodoDelete((currentTodosDelete) => 
          currentTodosDelete.filter((todo) => todo !== todoToDelete)
        );
      },  60 * 1000); // 2 minutes en millisecondes
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className='todolist'>
      <img 
        className='imgToDo' 
        src={hedgehogImage} 
        alt='hedgehog' 
        style={{
          display: 'block', 
          margin: '0 auto 0 auto', 
          maxWidth: '100px', 
          height: 'auto',
          marginTop: '-60px'
        }}
      />
      <h2>To do List</h2>
      <div className='TodoSelect'>
        <div className='TodoInput'>
          <input
            disabled
            checked
            id="disabled-checked-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <input 
            className='InputTodo' 
            onChange={(e) => setNewTodo(e.target.value)}  
            type="text" 
            onKeyDown={handleKeyPress}
            value={newTodo}
            placeholder='Notez vos objectifs'
          />
        </div>
        {todos.map((todo, index) => (
          <p className='TodoListSelect' key={index}>
            <input
              id="disabled-checked-checkbox"
              type="checkbox"
              value=""
              onChange={() => DeleteTodo(index)}
              className="w-4 h-4 accent-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label>{todo}</label>
          </p>
        ))}
      </div>
      <div className='TodoDelete'>
        {todosDelete.map((todo, index) => (
          <p className='TodoListDelete' key={index}>
            <input
              id="disabled-checked-checkbox"
              type="checkbox"
              value=""
              checked
              readOnly
              className="w-4 h-4 accent-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label>
              {todo} <span>(Il sera supprimé dans une minute)</span>
            </label>
          </p>
        ))}
      </div>
      <button onClick={addTodo} className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-1 px-4 border border-yellow-500 hover:border-transparent rounded">
        OK
      </button>
    </div>
  );
}
