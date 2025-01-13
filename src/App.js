import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskInput.trim() === '') return;

    if (editIndex !== null) {
      // Editing an existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = taskInput;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // Adding a new task
      setTasks([...tasks, taskInput]);
    }

    setTaskInput('');
  };

  const handleEditTask = (index) => {
    setTaskInput(tasks[index]);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', backgroundColor: 'pink', textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ backgroundColor: 'purple', color: 'white' }}>TODO List</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task"
          style={{ padding: '8px', width: '80%', border: 'none' }}
        />
        <button
          onClick={handleAddTask}
          style={{ padding: '8px 15px', backgroundColor: 'green', border: 'none', marginLeft: '10px', cursor: 'pointer' }}
        >
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              border: '1px solid #4c00b0',
              borderRadius: '5px',
              marginBottom: '10px',
            }}
          >
            <span>{task}</span>
            <div>
              <button
                onClick={() => handleEditTask(index)}
                style={{ marginRight: '10px', cursor: 'pointer', border: 'none', backgroundColor: 'purple', padding: '5px 10px', color: 'white' }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(index)}
                style={{ backgroundColor: 'red', border: 'none', color: 'white', padding: '5px 10px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;




