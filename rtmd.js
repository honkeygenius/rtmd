import React, { useState, useEffect } from 'react';
import { Clock, Check, List, Target, Calendar } from 'lucide-react';

const TimeManagementDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [pomodoroTimer, setPomodoroTimer] = useState(25 * 60); // 25 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Task Management
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks, 
        { 
          id: Date.now(), 
          text: newTask, 
          completed: false, 
          priority: 'medium' 
        }
      ]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const changePriority = (id, priority) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, priority } : task
    ));
  };

  // Pomodoro Timer
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && pomodoroTimer > 0) {
      interval = setInterval(() => {
        setPomodoroTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (pomodoroTimer === 0) {
      setIsTimerRunning(false);
      alert('Pomodoro session complete! Take a 5-minute break.');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, pomodoroTimer]);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setPomodoroTimer(25 * 60);
  };

  // Filtering tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  // Time formatting
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
        <Target className="mr-2" /> React Time Management Dashboard
      </h1>

      {/* Pomodoro Timer */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Clock className="mr-2" /> Pomodoro Timer
          </h2>
          <div className="text-2xl font-mono">
            {formatTime(pomodoroTimer)}
          </div>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={startTimer}
            disabled={isTimerRunning}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            Start
          </button>
          <button 
            onClick={resetTimer}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Task Input */}
      <div className="mb-6 flex">
        <input 
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="flex-grow p-2 border rounded-l"
        />
        <button 
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      {/* Task Filters */}
      <div className="mb-4 flex space-x-2">
        <button 
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All Tasks
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold flex items-center">
          <List className="mr-2" /> Task List
        </h2>
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 italic">No tasks yet. Add a task to get started!</p>
        ) : (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className={`
                flex items-center justify-between p-3 rounded 
                ${task.completed ? 'bg-green-100' : 'bg-white'}
                ${task.priority === 'high' ? 'border-l-4 border-red-500' : 
                  task.priority === 'medium' ? 'border-l-4 border-yellow-500' : 
                  'border-l-4 border-green-500'}
                shadow
              `}
            >
              <div className="flex items-center space-x-3">
                <input 
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="form-checkbox"
                />
                <span className={task.completed ? 'line-through text-gray-500' : ''}>
                  {task.text}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <select 
                  value={task.priority}
                  onChange={(e) => changePriority(task.id, e.target.value)}
                  className="p-1 rounded text-sm"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Time Management Tips */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Time Management Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Break large tasks into smaller, manageable steps</li>
          <li>Use the Pomodoro Technique: 25 minutes of focused work, followed by a 5-minute break</li>
          <li>Prioritize tasks using the high/medium/low priority system</li>
          <li>Remove or delegate tasks that aren't essential</li>
          <li>Take regular breaks to maintain productivity</li>
        </ul>
      </div>
    </div>
  );
};

export default TimeManagementDashboard;
