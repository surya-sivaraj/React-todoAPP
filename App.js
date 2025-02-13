import React, {useState} from 'react'
import "./App.css"


const App = () => {
  let [showPopup, setShowPopup] = useState(false);
  let [task, setTask] = useState('');
  let [date, setDate] = useState('');
  let [time, setTime] = useState('');
  const [tasks, setTasks] = useState([]);
  

  const handleAddTaskClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task && date && time) {
      setTasks([...tasks, { task, date, time }]);
      setTask(""); 
      setDate(""); 
      setTime(""); 
      setShowPopup(false); 
    } else {
      alert("Please fill out all fields.");
    }
  };
  const handleCheckboxChange = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: true } : t
    );
    setTasks(updatedTasks);

    setTimeout(() => {
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    }, 5000);
  };


  return (   <div className='main-container'>
      <div className='second-container'>
        <h1 style={{color:"black", marginBottom:"10px"}}>TODO-LIST📝</h1>
        <div className='input-container'>
        <input type='text' placeholder='Enter your task' className='inputtt' value={task}
                  onChange={(e) => setTask(e.target.value)} />
        <button className='but' onClick={handleAddTaskClick}>Add Task</button>
        </div>
        
        <h1>Check Your Tasks⬇️</h1>
        <div className="tasks-container">
          {tasks.map((t, index) => (
            <div
              key={index}
              className={`task-card ${t.completed ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                id={`task-${index}`}
                onChange={() => handleCheckboxChange(index)}
              />
              <label htmlFor={`task-${index}`}>
                <strong>{t.task}</strong>
              </label>
              <div>
                <label>
                  <strong>Date:</strong> {t.date}
                  </label>
                <label>
                  <strong>Time:</strong> {t.time}
                </label>
              </div>
            </div>
          ))}
        </div>
        {showPopup && (
          <div className='popup-overlay'>
            <div className='popup-box'>
              <h2>Add Task</h2>
              <form onSubmit={handleSubmit}>
                <label>Task Name:</label><br />
                <input
                  type='text'
                  placeholder='Enter task name'
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  required
                /><br />
                <label>Date:</label><br />
                <input
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                /><br />
                <label>Time:</label><br />
                <input
                  type='time'
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                /><br />
                <div className='task-buttons'>
                  <button type='submit' className='submit-btn'>
                    Submit
                  </button>
                  <button type='button' className='close-btn' onClick={handleClosePopup}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
         