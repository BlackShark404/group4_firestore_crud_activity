import { useState, useEffect } from 'react'
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, serverTimestamp, orderBy, query } from 'firebase/firestore'
import { db } from './firebase'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskList);
    });
    return () => unsubscribe();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    try {
      await addDoc(collection(db, "tasks"), {
        name: newTask,
        status: "active",
        createdAt: serverTimestamp()
      });
      setNewTask("");
    } catch (e) {
      console.error("Error adding task:", e);
    }
  };

  const markAsDone = async (id) => {
    const taskRef = doc(db, "tasks", id);
    try {
      await updateDoc(taskRef, {
        status: "done"
      });
    } catch (e) {
      console.error("Error updating task:", e);
    }
  };

  const deleteTask = async (id) => {
    const taskRef = doc(db, "tasks", id);
    try {
      await deleteDoc(taskRef);
    } catch (e) {
      console.error("Error deleting task:", e);
    }
  };

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Student Task Manager</h1>
      
      <form onSubmit={addTask} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="New Task"
          style={{ padding: '8px', marginRight: '8px', width: '70%' }}
        />
        <button type="submit" style={{ padding: '8px' }}>Add Task</button>
      </form>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ textDecoration: task.status === "done" ? "line-through" : "none", flexGrow: 1 }}>
              {task.name} ({task.status})
            </span>
            <div>
              {task.status === "active" && (
                <button onClick={() => markAsDone(task.id)} style={{ marginRight: '8px', cursor: 'pointer', padding: '4px 8px' }}>Mark as Done</button>
              )}
              <button onClick={() => deleteTask(task.id)} style={{ cursor: 'pointer', padding: '4px 8px' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
