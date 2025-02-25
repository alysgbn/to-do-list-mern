import React, { useEffect, useState } from "react";
import "../resources/home.scss";
import { Container } from "react-bootstrap";
import ToDoForm from "./ToDoForm.tsx";
import ToDoLists from "./ToDoLists.tsx";
import { useNavigate } from "react-router";
import axios from "axios";

export const Home = () => {
  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // State to hold the current task input
  const [task, setTask] = useState("");
  // API endpoint URL
  const API = "http://localhost:5000/todos";
  // State to store the list of tasks fetched from the server
  const [taskData, setTaskData] = useState([]);

  // useEffect hook to fetch the todo list from the server when the component mounts
  useEffect(() => {
    axios
      .get(API)
      .then((response) => {
        const data = response.data;
        setTaskData(data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to delete a task from the server and update local state
  function deleteTask(index) {
    axios
      .delete(`${API}/${index}`, { params: { index: index } })
      .then(() => {
        // Filter out the deleted task by its _id and update the state
        setTaskData(taskData.filter((task) => task._id !== index));
        console.log("data delete", taskData);
      })
      .catch((error) => console.error("Error deleting task:", error));
  }

  // Function to edit a task on the server and update local state
  function editTask(taskId, newValue) {
    axios
      .put(`${API}/${taskId}`, { task: newValue })
      .then((response) => {
        // Update the specific task in the state with the new value
        setTaskData(
          taskData.map((task) =>
            task._id === taskId ? { ...task, task: newValue } : task
          )
        );
      })
      .catch((error) => console.error("Error editing task:", error));
  }

  // Function to add a new task to the server and update local state
  function handleButtonClick() {
    axios
      .post(API, { task })
      .then((response) => {
        // Append the new task to the taskData state
        setTaskData([...taskData, response.data]); // Update state with the new task
        setTask(""); // Clear input field after submission
      })
      .catch((error) => console.error("Error adding task:", error));
  }

  return (
    <Container>

      <div className="background"></div>


      <div className="home-container">
        {/* Pass down the form functions and state to the ToDoForm component */}
        <ToDoForm
          handleButtonClick={handleButtonClick}
          setTask={setTask}
          task={task}
        />
   
      <div className="todo-list-container">
        {/* Pass down taskData and CRUD functions to the ToDoLists component */}
        <ToDoLists
          data={taskData}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
      </div>
      {/* Navigate to another route on click */}
      <div
        style={{ marginTop: "2rem", color: "#e5d8ce", cursor: "pointer" }}
        onClick={() => navigate("/second")}
      >
        Proceed
      </div>
    </Container>
  );
};
