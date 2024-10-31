import { useState } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState<string[]>([
    "Eat Breakfast",
    "Go to Work",
    "Walk the Dog",
    "Go Home",
    "Eat Dinner",
    "Go to Sleep",
    "Repeat",
  ]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (!newTask) return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const moveTaskUp = (index: number) => {
    if (index === 0) return;
    const updatedTasks = [...tasks];
    [updatedTasks[index], updatedTasks[index - 1]] = [
      updatedTasks[index - 1],
      updatedTasks[index],
    ];
    setTasks(updatedTasks);
  };

  const moveTaskDown = (index: number) => {
    if (index === tasks.length - 1) return;
    const updatedTasks = [...tasks];
    [updatedTasks[index], updatedTasks[index + 1]] = [
      updatedTasks[index + 1],
      updatedTasks[index],
    ];
    setTasks(updatedTasks);
  };

  return (
    <div className="to-do-list">
      <h1>ToDoList</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <span className="text">{task}</span>
              <div>
                <button
                  className="move-button"
                  onClick={() => moveTaskUp(index)}
                  disabled={index === 0}
                >
                  👆🏻
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTaskDown(index)}
                  disabled={index === tasks.length - 1}
                >
                  👇🏻
                </button>
                <button
                  className="delete-button"
                  onClick={() => removeTask(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default ToDoList;
