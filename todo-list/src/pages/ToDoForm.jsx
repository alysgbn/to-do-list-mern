import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
const ToDoForm = ({ todoList, setTodoList }) => {
  const [task, setTask] = useState("");

  function handleButtonClick() {
    // setTodoList([...todoList, task]);
    // setTask("");
      // Post the new task to the server
      axios
      .post("http://localhost:4001/todos", { task})
      .then((response) => {
        const data = response.data;
        console.log(data);
        setTodoList([...data], ...todoList); 
        // if (Array.isArray(data)) {
        //   setTodoList([...data], ...todoList); // Update the state with the updated list from the server
        //   console.log(todoList);
        // }
      })
      .catch((error) => console.error("Error adding task:", error));

    setTask(""); // Clear the input field
  }
  


  
  return (
    <div className="form-btn">
      <Form.Label>To-do</Form.Label>
      <Form>
        <Form.Group controlId="todo">
          <Form.Control
            type="text"
            placeholder="Write your task"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
        </Form.Group>
      </Form>
      <Button
        variant="outline-light"
        onClick={() => {
          handleButtonClick();
        }}
      >
        +
      </Button>{" "}
    </div>
  );
};

export default ToDoForm;
