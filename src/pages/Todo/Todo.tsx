import React, { useState, useEffect } from 'react';
import { useToast } from '../../hooks/useToast';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { type Task } from '../../types';
import './Todo.css';

const Todo: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const { showToast } = useToast();

  // Move loadTasks definition BEFORE the useEffect that uses it
  const loadTasks = () => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = (updatedTasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (!title.trim()) {
      showToast('Error', 'Please enter a task title', 'error');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      addedAt: new Date().toLocaleString()
    };

    const updatedTasks = [newTask, ...tasks];
    saveTasks(updatedTasks);
    setTitle('');
    setDescription('');
    showToast('Success', 'Task added successfully', 'success');
  };

  const toggleComplete = (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
    
    const task = updatedTasks.find(t => t.id === taskId);
    showToast(
      'Task Updated',
      task?.completed ? 'Task marked as incomplete' : 'Task marked as complete',
      'success'
    );
  };

  const confirmDelete = (taskId: number) => {
    setTaskToDelete(taskId);
    setDeleteModalOpen(true);
  };

  const deleteTask = () => {
    if (taskToDelete) {
      const updatedTasks = tasks.filter(task => task.id !== taskToDelete);
      saveTasks(updatedTasks);
      showToast('Success', 'Task deleted successfully', 'warning');
      setDeleteModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const getTaskCount = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    
    if (total === 0) return 'No tasks';
    if (completed === total) return `All ${total} completed`;
    return `${completed}/${total} completed`;
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
  });

  return (
    <div className="todo-page">
      <div className="todo-container">
        <div className="todo-header">
          <h1>
            <i className="fi fi-rr-list-check"></i>
            TaskMaster
          </h1>
          <div className="task-count">{getTaskCount()}</div>
        </div>

        <div className="todo-grid">
          <div className="add-task-section">
            <div className="add-task-card">
              <h3>
                <i className="fi fi-rr-plus"></i>
                Add New Task
              </h3>

              <div className="form-group">
                <label>
                  <i className="fi fi-rr-heading"></i>
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="fi fi-rr-align-left"></i>
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add details about the task"
                  rows={4}
                />
              </div>

              <button onClick={addTask} className="btn-add-task">
                <i className="fi fi-rr-plus"></i>
                Add Task
              </button>
            </div>
          </div>

          <div className="tasks-section">
            <div className="tasks-list">
              {sortedTasks.length === 0 ? (
                <div className="no-tasks">
                  <i className="fi fi-rr-clipboard-list"></i>
                  <h3>No tasks yet</h3>
                  <p>Add your first task using the form</p>
                </div>
              ) : (
                sortedTasks.map(task => (
                  <div
                    key={task.id}
                    className={`task-item ${task.completed ? 'completed' : ''}`}
                  >
                    <div className="task-content">
                      <div className="task-title">
                        <i className={`fi ${task.completed ? 'fi-sr-check-circle' : 'fi-rr-circle'}`}></i>
                        <span>{task.title}</span>
                      </div>
                      {task.description && (
                        <div className="task-description">{task.description}</div>
                      )}
                      <div className="task-meta">
                        <i className="fi fi-rr-clock"></i>
                        {task.addedAt}
                      </div>
                    </div>

                    <div className="task-actions">
                      <button
                        onClick={() => toggleComplete(task.id)}
                        className={`task-btn complete-btn ${task.completed ? 'completed' : ''}`}
                        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                      >
                        <i className={`fi ${task.completed ? 'fi-sr-check' : 'fi-rr-check'}`}></i>
                      </button>
                      <button
                        onClick={() => confirmDelete(task.id)}
                        className="task-btn delete-btn"
                        title="Delete task"
                      >
                        <i className="fi fi-rr-trash"></i>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this task?"
        onConfirm={deleteTask}
        onCancel={() => {
          setDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
      />
    </div>
  );
};

export default Todo;
