import './App.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const createTask = async (title, taskDescription) => {
    const response = await Axios.post('http://localhost:3004/tasks', {
      title,
      taskDescription,
    });
    console.log(response);
    const createdTasks = [
      ...tasks, 
      response.data
    ];
    setTasks(createdTasks);
  };
  const fetchTasks = async () => {
    const response = await Axios.get('http://localhost:3004/tasks');
    debugger;
    setTasks(response.data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  const deleteTaskById = async (id) => {
    await Axios.delete(`http://localhost:3004/tasks/${id}`);
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(afterDeletingTasks);
  };
  const editTaskById = async (id, updatedTitle, updatedTaskDescription) => {
    await Axios.put(`http://localhost:3004/tasks/${id}`, {
      title: updatedTitle,
      taskDescription: updatedTaskDescription,
    });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { id, title: updatedTitle, taskDescription: updatedTaskDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <TaskCreate onCreate={createTask} />
      <h1>Tasks</h1>
      <TaskList
        tasks={tasks}
        onDelete={deleteTaskById}
        onUpdate={editTaskById}
      />
    </div>
  );
}

export default App;