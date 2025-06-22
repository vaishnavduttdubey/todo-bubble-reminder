import React, { useState, useEffect } from 'react';
import './Todo.css';

const quotes = [
  "🌟 Believe in yourself.",
  "🔥 Push harder than yesterday!",
  "💪 Don't stop until you're proud.",
  "🏆 Success is earned daily.",
  "⚡ Make today amazing!",
  "🚀 Keep growing. Keep glowing.",
  "📈 Consistency beats motivation.",
  "🎯 Focus. Hustle. Win.",
  "☀️ Be your own sunshine.",
  "⏳ Time waits for no one."
  // ...you can add up to 365
];

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    setQuote(quotes[dayOfYear % quotes.length]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const updatedTodos = todos.filter(todo => now - todo.createdAt < 86400000);
      if (updatedTodos.length !== todos.length) {
        setTodos(updatedTodos);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
        createdAt: new Date().getTime(),
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">📓 To-Do Bubble List</h2>
      <div className="quote-banner">{quote}</div>

      <div className="todo-input-group">
        <input
          type="text"
          value={inputValue}
          placeholder="💡 Add your next big idea..."
          onChange={(e) => setInputValue(e.target.value)}
          className="todo-input"
        />
        <button onClick={addTodo} className="todo-button">➕ Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span className="todo-text">🔹 {todo.text}</span>
            <button className="delete-button" onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
