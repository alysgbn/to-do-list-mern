import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
interface Task {
  _id: string;
  task?: string;
}

type Props = {
  data: Task[];
  deleteTask: (id: string) => void;
  editTask: (id: string, newValue: string) => void; // ADDED: Added editTask prop to Props interface
};

const ToDoLists = ({ data, deleteTask, editTask }: Props) => {
  const [editIndex, setEditIndex] = useState<string | null>(null); // ADDED: State to track which task is being edited
  const [editedTask, setEditedTask] = useState<{ [key: string]: string }>({}); // ADDED: State to store edited values

  return (
    <div>
      {/* <h1>To Do List</h1> */}
      {data.map((item) => (
        <div className="todo-lists" key={item._id}>




          <div className="left">
            {/* <div> */}
            <Form.Check // prettier-ignore
              type={"checkbox"}
            // id={`default-${type}`}
            // label={`default ${type}`}
            />
            <div>
              <h5>Task {item._id}</h5>

              {editIndex === item._id ? ( // UPDATED: Conditionally render input if task is in edit mode
                <input
                  type="text"
                  value={editedTask[item._id] ?? item.task}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, [item._id]: e.target.value })
                  }
                />
              ) : (
                <p>{item.task}</p>
              )}
            </div>
          </div>

          <div className="edit-delete">
            {editIndex === item._id ? ( // UPDATED: Show "Save" button when editing
              <Button
                className="btn-save"
                onClick={() => {
                  const newValue = editedTask[item._id] || item.task;
                  editTask(item._id, newValue!); // ADDED: Call editTask to update the task on the server
                  setEditIndex(null); // ADDED: Reset edit mode after saving
                }}
              >
                Save
              </Button>
            ) : (
              <Button
                className="btn-edit"
                onClick={() => {
                  setEditIndex(item._id); // ADDED: Set the current task to edit mode
                  // Pre-fill the input with the current task value
                  setEditedTask({ ...editedTask, [item._id]: item.task || "" });
                }}
              >
                Edit
              </Button>
            )}
            <Button

              variant="outline-light"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this task?")
                ) {
                  deleteTask(item._id);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToDoLists;
