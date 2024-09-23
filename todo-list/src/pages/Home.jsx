import React from "react";
import "../resources/home.scss";
import { Button, Form } from "react-bootstrap";

export const Home = () => {
  return (
    <body>
      <h1>To Do List</h1>
      <div className="form-btn">
        <Form.Label>To-do</Form.Label>
        <Form>
          <Form.Group controlId="todo">
            <Form.Control type="text" placeholder="Input to-do" />
          </Form.Group>
        </Form>
        <Button variant="outline-light">Add</Button>{" "}
      </div>
    </body>
  );
};
