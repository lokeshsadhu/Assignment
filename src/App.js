import React, { useState } from 'react';
import './App.css'

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [selectedDay, setSelectedDay] = useState('All');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTodo, setEditedTodo] = useState({
    title: '',
    description: '',
    date: '',
  });

  const daysOfWeek = ['All', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const addTodo = () => {
    if (newTodo.title && newTodo.description && newTodo.date) {
      setTodos([...todos, { ...newTodo, id: Date.now() }]);
      setNewTodo({ title: '', description: '', date: '' });
    } else {
      alert('Please fill out all fields before saving.');
    }
  };

  const filterTodos = (day) => {
    setSelectedDay(day);
    setEditingTodo(null); // Clear editing state when changing the filter
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodo(id);
    setEditedTodo({ ...todoToEdit });
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editedTodo.title, description: editedTodo.description, date: editedTodo.date } : todo
      )
    );
    setEditingTodo(null);
    setEditedTodo({ title: '', description: '', date: '' });
  };

  const cancelEdit = () => {
    setEditingTodo(null);
    setEditedTodo({ title: '', description: '', date: '' });
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setEditingTodo(null);
    setEditedTodo({ title: '', description: '', date: '' });
  };

  const filteredTodos = selectedDay === 'All' ? todos : todos.filter((todo) => {
    const todoDay = new Date(todo.date).toLocaleDateString('en-US', { weekday: 'long' });
    return todoDay === selectedDay;
  });

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={newTodo.date}
          onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
        />
      </div>
      <button onClick={addTodo}>Save</button>

      <div>
        <h2>Filter by Day:</h2>
        {daysOfWeek.map((day) => (
          <button
            key={day}
            className={selectedDay === day ? 'active' : ''}
            onClick={() => filterTodos(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div>
        <h2>Todo Items:</h2>
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id} className="todo-item">
              {editingTodo === todo.id ? (
                <div className="todo-edit-container">
                  <label>Title:</label>
                  <input
                    type="text"
                    value={editedTodo.title}
                    onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
                  />
                  <label>Description:</label>
                  <input
                    type="text"
                    value={editedTodo.description}
                    onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
                  />
                  <label>Date:</label>
                  <input
                    type="date"
                    value={editedTodo.date}
                    onChange={(e) => setEditedTodo({ ...editedTodo, date: e.target.value })}
                  />
                  <button onClick={() => saveEdit(todo.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <div className="todo-view-container">
                  <strong>{todo.title}</strong>
                  <div>{todo.description}</div>
                  <div>{todo.date}</div>
                  <div className="todo-buttons">
                    <button onClick={() => editTodo(todo.id)}>Edit</button>
                    <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
