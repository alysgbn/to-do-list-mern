const express = require('express'); 
const cors = require('cors'); 
// const mongoose = require('mongoose'); 
require('dotenv').config(); 

//Execute express 
const app = express(); 

//Middlewares
app.use(express.json()); 
app.use(cors()); 

const port = 4001; 


// Temporary in-memory data store (since there's no database for now)
let todoList = ["help", "ayaw"];

// Routes

// Get all todo tasks
app.get('/todos', (req, res) => {
  res.json(todoList);
});

// Add a new task
app.post('/todos', (req, res) => {
  const newTask = req.body.task;
  todoList.push(newTask);
  res.status(201).json(todoList);
});

// Edit a task by index
app.put('/todos/:index', (req, res) => {
  const index = req.params.index;
  const updatedTask = req.body.task;

  if (index >= 0 && index < todoList.length) {
    todoList[index] = updatedTask;
    res.json(todoList);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// Delete a task by index
app.delete('/todos/:index', (req, res) => {
  const index = req.params.index;

  if (index >= 0 && index < todoList.length) {
    todoList.splice(index, 1);
    res.json(todoList);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.listen(port, () => console.log("Server is running on port", port));