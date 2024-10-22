import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
type Props = {
  handleButtonClick: () => void;
  setTask: (task: string) => void;
  task?: string;
}
const ToDoForm = ( { handleButtonClick, setTask, task }: Props ) => {
  

  return (
    <div className="form-btn">
      <Form.Label>To-do</Form.Label>
      <Form>
        <Form.Group controlId="todo">
          <Form.Control
            type="text"
            placeholder="Write your task"
            onChange={(e) => setTask(e.target.value)}
            // value={task}
          />
        </Form.Group>
      </Form>
      <Button
        variant="outline-light"
        onClick={() => {
          handleButtonClick();
          console.log(task);
        }}
      >
        +
      </Button>{" "}
    </div>
  );
};

export default ToDoForm;
