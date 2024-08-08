import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ListSharpIcon from '@mui/icons-material/ListSharp';
import RotateLeftSharpIcon from '@mui/icons-material/RotateLeftSharp';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { Modal, TextField, Button } from "@mui/material";
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  console.log(todos)

  useEffect(() => {
    const todoData = localStorage.getItem("todos")
    if (todoData) {
      setTodos(JSON.parse(todoData))
    }
  }, [])

  const addTodo = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    if (title && description) {
      const newTodo = { id: uuidv4(), title, description }
      const updatedTodo = [...todos, newTodo]
      setTodos(updatedTodo)
      localStorage.setItem("todos", JSON.stringify(updatedTodo))
      handleClose()
      setTitle("")
      setDescription("")

    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold underline text-center my-2 font-sans">
        KanbanBoard Layout
      </h1>

      <div className='flex justify-around w-full flex-wrap my-3'>
        <div className='border border-slate-400 rounded-md w-[calc(100%-5%)] sm:w-[calc(50%-2%)] md:w-[calc(25%-2%)] my-3 h-full'>
          <h1 className='text-center font-bold my-2'><ListSharpIcon style={{ fontSize: "large", backgroundColor: "#0251cc", padding: "2px", borderRadius: "3px", marginRight: "3px", marginBottom: "2px", color: "white" }} />To Do <AddCircleSharpIcon className='ml-10 cursor-pointer' style={{ color: "#0251cc" }} onClick={() => addTodo()} /></h1>
          <ul className="bg-slate-100 rounded-b-md px-2 py-3">
            {todos.map((todo, index) => (
              <li className='border border-l-4 border-l-blue-700 rounded-md p-2  mb-3'>
                <h1 className='font-bold'>{todo.title}</h1>
                <p>{todo.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className='border border-slate-400 rounded-md w-[calc(100%-5%)] sm:w-[calc(50%-2%)] md:w-[calc(25%-2%)] my-3 h-full'>
          <h1 className='text-center font-bold my-2'><RotateLeftSharpIcon style={{ fontSize: "large", backgroundColor: "#ea9713", padding: "2px", borderRadius: "3px", marginRight: "1px", marginBottom: "2px", color: "white" }} /> In Progress</h1>
          <ul className="bg-slate-100 rounded-b-md px-2 py-3">
            <li className='border border-l-4 border-l-custom-orange rounded-md p-2  mb-3'>
              <h1 className='font-bold'>Title-1</h1>
              <p>Description-1</p>
              <p>Description-1</p>
            </li>
          </ul>
        </div>

        <div className='border border-slate-400 rounded-md w-[calc(100%-5%)] sm:w-[calc(50%-2%)] md:w-[calc(25%-2%)] my-3 h-full'>
          <h1 className='text-center font-bold my-2'><RemoveRedEyeSharpIcon style={{ fontSize: "large", backgroundColor: "#8e4399", padding: "2px", borderRadius: "3px", marginRight: "3px", marginBottom: "2px", color: "white" }} />Peer Review</h1>
          <ul className="bg-slate-100 rounded-b-md px-2 py-3">
            <li className='border border-l-4 border-l-custom-purple rounded-md p-2  mb-3'>
              <h1 className='font-bold'>Title-1</h1>
              <p>Description-1</p>
              <p>Description-1</p>
            </li>
          </ul>
        </div>

        <div className='border border-slate-400 rounded-md w-[calc(100%-5%)] sm:w-[calc(50%-2%)] md:w-[calc(25%-2%)] my-3 h-full'>
          <h1 className='text-center font-bold my-2'><CheckCircleOutlineSharpIcon style={{ fontSize: "large", backgroundColor: "#63ba3c", padding: "2px", borderRadius: "3px", marginRight: "3px", marginBottom: "2px", color: "white" }} />Done</h1>
          <ul className="bg-slate-100 rounded-b-md px-2 py-3">
            <li className='border border-l-4 border-l-custom-green rounded-md p-2  mb-3'>
              <h1 className='font-bold'>Title-1</h1>
              <p>Description-1</p>
              <p>Description-1</p>
            </li>
          </ul>
        </div>

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
            <Button variant="contained" color="primary"
              onClick={handleSubmit}
            >
              Add To-Do
            </Button>
            <Button variant="text" color="secondary"
              onClick={handleClose}
              className="ml-2">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default App
