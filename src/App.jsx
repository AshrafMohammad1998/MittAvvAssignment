import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ListSharpIcon from '@mui/icons-material/ListSharp';
import RotateLeftSharpIcon from '@mui/icons-material/RotateLeftSharp';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { Modal, TextField, Button } from "@mui/material";
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetCard, setTargetCard] = useState({ colId: "", taskId: "" });

  // Defining the columns configurations (icons and titles)
  const columnConfig = [
    { id: 'todo', title: 'To Do', icon: <ListSharpIcon style={{ fontSize: "large", backgroundColor: "#0251cc", padding: "2px", borderRadius: "3px", marginRight: "3px", marginBottom: "2px", color: "white" }} /> },
    { id: 'in-progress', title: 'In Progress', icon: <RotateLeftSharpIcon style={{ fontSize: "large", backgroundColor: "#ea9713", padding: "2px", borderRadius: "3px", marginRight: "1px", marginBottom: "2px", color: "white" }} /> },
    { id: 'peer-review', title: 'Peer Review', icon: <RemoveRedEyeSharpIcon style={{ fontSize: "large", backgroundColor: "#8e4399", padding: "2px", borderRadius: "3px", marginRight: "3px", marginBottom: "2px", color: "white" }} /> },
    { id: 'done', title: 'Done', icon: <CheckCircleOutlineSharpIcon style={{ fontSize: "large", backgroundColor: "#63ba3c", padding: "2px", borderRadius: "3px", marginRight: "3px", marginBottom: "2px", color: "white" }} /> },
  ];

  //Getting tasks from local storage
  const [columns, setColumns] = useState(
    JSON.parse(localStorage.getItem("kanban-columns")) || [
      { id: 'todo', tasks: [] },
      { id: 'in-progress', tasks: [] },
      { id: 'peer-review', tasks: [] },
      { id: 'done', tasks: [] },
    ]
  );

  //Updating tasks in local storage once the task is moved to another column
  useEffect(() => {
    const serializableColumns = columns.map(column => ({
      id: column.id,
      tasks: column.tasks.map(task => ({ id: task.id, title: task.title, description: task.description })),
    }));
    localStorage.setItem("kanban-columns", JSON.stringify(serializableColumns));
  }, [columns]);

  //Opening the add task modal
  const addTask = () => {
    setIsModalOpen(true);
  };

  //Closing the add task modal
  const handleClose = () => {
    setIsModalOpen(false);
  };

  // Creating task
  const handleSubmit = () => {
    if (title && description) {
      const newTask = { id: uuidv4(), title, description };
      const updatedColumns = columns.map(column =>
        column.id === 'todo' ? { ...column, tasks: [...column.tasks, newTask] } : column
      );
      setColumns(updatedColumns);
      handleClose();
      setTitle("");
      setDescription("");
    }
  };

  // Code for task dragging
  const dragFrom = (colId, taskId) => {
    setTargetCard({ colId, taskId });
  };

  const dragTo = (colId) => {
    const sourceColIndex = columns.findIndex((col) => col.id === targetCard.colId); //0
    const targetColIndex = columns.findIndex((col) => col.id === colId); //2
    if (sourceColIndex < 0 || targetColIndex < 0) return;

    const sourceTaskIndex = columns[sourceColIndex].tasks.findIndex((task) => task.id === targetCard.taskId);
    if (sourceTaskIndex < 0) return;

    const tempColumns = [...columns];
    const [movedTask] = tempColumns[sourceColIndex].tasks.splice(sourceTaskIndex, 1);
    tempColumns[targetColIndex].tasks.push(movedTask);

    setColumns(tempColumns);
    setTargetCard({ colId: "", taskId: "" });
  };

  // Searching for a task
  const filterTasks = (tasks) => {
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div>
      <h1 className="text-xl font-bold underline text-center my-2 font-sans">
        KanbanBoard Layout
      </h1>
      <div className="text-center my-4">
        <TextField
          label="Search Tasks"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[calc(100%-20px)] max-w-md"
        />
      </div>
      <div className='flex justify-around w-full flex-wrap my-3'>
        {columnConfig.map((column) => {
          const tasks = columns.find(col => col.id === column.id)?.tasks || [];
          const filteredTasks = filterTasks(tasks);

          return (
            <div
              key={column.id}
              className='border border-slate-400 rounded-md w-[calc(100%-5%)] sm:w-[calc(50%-2%)] md:w-[calc(25%-2%)] my-3 h-full'
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dragTo(column.id)}
            >
              <h1 className='text-center font-bold my-2'>
                {column.icon}{column.title}
                {column.id === 'todo' && (
                  <AddCircleSharpIcon className='ml-10 cursor-pointer' style={{ color: "#0251cc" }} onClick={() => addTask()} />
                )}
              </h1>
              <ul className="bg-slate-100 rounded-b-md px-2 py-3">
                {filteredTasks.map((task) => (

                  <li
                    key={task.id}
                    className={`cursor-grab border border-l-4 rounded-md p-2 mb-3 ${column.id === 'todo' ? "border-l-blue-700" :
                        column.id === 'in-progress' ? "border-l-custom-orange" :
                          column.id === 'peer-review' ? "border-l-custom-purple" :
                            column.id === 'done' ? "border-l-custom-green" :
                              ""
                      }`}
                    draggable
                    onDragStart={() => dragFrom(column.id, task.id)}
                  >
                    <h1 className='font-bold'>{task.title}</h1>
                    <p>{task.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <Modal open={isModalOpen} onClose={handleClose}>
        <div className="modal-content p-5 bg-white rounded shadow-lg max-w-sm mx-auto mt-24 space-y-3">
          <h2 className="text-center font-bold mb-2">Add New To-Do</h2>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
            required
          />
          <TextField
            rows={4}
            multiline
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4"
            required
          />
          <div className="text-center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Add To-Do
            </Button>
            <Button variant="text" color="secondary" onClick={handleClose} className="ml-2">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
