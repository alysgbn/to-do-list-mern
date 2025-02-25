import React from "react";
import { Button, Form } from "react-bootstrap";

type Props = {
  handleButtonClick: () => void;
  setTask: (task: string) => void;
  task?: string;
};

const ToDoForm = ({ handleButtonClick, setTask, task = "" }: Props) => {
  // Using a default value for task to ensure it's always a string

  // Handle form submission via onSubmit event to allow pressing Enter
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents page reload on submit
    if (task.trim() !== "") {
      handleButtonClick();
      setTask(""); // Clear input only after successful submission if needed
    }
  };

  return (
    <div className="form-btn">
      {/* <Form.Label>To-do</Form.Label> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="todo">
          <input
            type="text"
            placeholder="Write your task"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
        </Form.Group>
        {/* Added type="submit" to allow form submission with Enter key */}
        {/* <Button variant="outline-light" type="submit">
          +
        </Button> */}
      </Form>
    </div>
  );
};

export default ToDoForm;
