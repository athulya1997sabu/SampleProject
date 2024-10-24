import React, { useState, useEffect } from 'react';

const PomodoroApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true); // True = Work, False = Break

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
    setNewTask('');
  };

  // Handle completing a task
  const handleCompleteTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Handle deleting a task
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Timer logic
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsWorkSession(!isWorkSession);
      setTimeLeft(isWorkSession ? 5 * 60 : 25 * 60); // Switch session
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isWorkSession]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <h1>Pomodoro Timer</h1>

      {/* Task Input */}
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => handleCompleteTask(task.id)}>{task.title}</span>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Timer */}
      <div className="timer">
        <h2>{isWorkSession ? 'Work Time' : 'Break Time'}</h2>
        <p>{formatTime(timeLeft)}</p>
        <div className="controls">
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={() => setTimeLeft(isWorkSession ? 25 * 60 : 5 * 60)}>
            Reset
          </button>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .container {
          max-width: 500px;
          margin: auto;
          text-align: center;
          font-family: Arial, sans-serif;
        }
        .task-input {
          margin-bottom: 20px;
        }
        .task-list {
          list-style: none;
          padding: 0;
        }
        .task-list li {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
        }
        .task-list li.completed span {
          text-decoration: line-through;
        }
        .timer {
          margin-top: 30px;
        }
        .controls button {
          margin: 5px;
        }
        @media (max-width: 600px) {
          .task-list {
            display: none; /* Collapsible for mobile */
          }
        }
      `}</style>
    </div>
  );
};

export default PomodoroApp;
