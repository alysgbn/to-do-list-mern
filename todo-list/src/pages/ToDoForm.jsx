import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
const ToDoForm = ({ todoList, setTodoList }) => {
  const [task, setTask] = useState("");



  function handleButtonClick() {
    setTodoList([...todoList, task]);
    setTask("");
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
