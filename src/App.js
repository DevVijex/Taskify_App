import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    // Initial load of tasks from localStorage
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskInput, setTaskInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Save tasks to localStorage whenever `tasks` changes
  useEffect(() => {
    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks to localStorage:", error);
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (taskInput.trim() === "") return;

    if (editIndex !== null) {
      // Update an existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { ...updatedTasks[editIndex], text: taskInput };
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // Add a new task
      setTasks([...tasks, { text: taskInput, completed: false }]);
    }

    setTaskInput("");
  };

  const handleEditTask = (index) => {
    setTaskInput(tasks[index].text);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        height: "650px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
        marginTop: "50px",
        backgroundImage: `url('/image/pic.jpg')`, // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center", // Changed to center for proper alignment
        borderRadius: "10px", // Only rounds corners
        border: "5px solid pink", // Adds a pink border
        color: "white",
      }}
    >
      <h1
        style={{
          backgroundColor: "rgba(128, 0, 128, 0.8)",
          color: "white",
          padding: "10px",
          marginBottom: "-95px",
          marginTop: "5px",
        }}
      >
        Taskify
      </h1>
      <p style={{ color: "red", marginTop: "105px", marginBottom: "50px" }}>
        <i>...your daily dose of productivity!</i>
      </p>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task"
          style={{
            padding: "8px",
            color: "black",
            fontStyle: "transparent",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            width: "85%",
            border: "none",
          }}
        />
        <button
          onClick={handleAddTask}
          style={{
            padding: "8px 15px",
            backgroundColor: "green",
            border: "none",
            marginLeft: "10px",
            color: "paleturquoise",
            marginTop: "15px",
            cursor: "pointer",
          }}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              color: "purple",
              border: "1px solid #4c00b0",
              borderRadius: "10px",
              marginBottom: "10px",
              backgroundColor: task.completed
                ? "#d4ffd4"
                : "rgba(255, 255, 255, 0.8)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
                style={{
                  marginRight: "10px",
                  width: "20px",
                  height: "20px",
                  transform: "scale(1.5)",
                  cursor: "pointer",
                  appearance: "none", // Removes default styles
                  border: "0.5px solid #4c00b0", // Custom border color
                  borderRadius: "4px", // Optional: Rounded edges
                  backgroundColor: task.completed ? "#4c00b0" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              />

              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>

              {/* Add checkmark inside the checkbox using ::after pseudo-element */}
              <style>
                {`
      input[type="checkbox"]:checked::after {
        content: "✔"; 
        color: white; 
        font-size: 14px; 
        font-weight: bold;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `}
              </style>
            </div>

            <div>
              <button
                onClick={() => handleEditTask(index)}
                style={{
                  marginRight: "10px",
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "purple",
                  padding: "5px 10px",
                  color: "white",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(index)}
                style={{
                  backgroundColor: "red",
                  border: "none",
                  color: "white",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
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
