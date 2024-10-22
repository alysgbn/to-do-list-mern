import React, { useEffect, useState } from "react";
import "../resources/home.scss";
import { Container } from "react-bootstrap";
import ToDoForm from "./ToDoForm.tsx";
import ToDoLists from "./ToDoLists";
import { useNavigate } from "react-router";
import axios from "axios";

export const Home = () => {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [task, setTask] = useState("");
  const API = "http://localhost:5000/todos";
  // localStorage.setItem("toDoList", todoList);

  // function deleteTask(index) {
  //   const newTodoList = [...todoList];
  //   newTodoList.splice(index, 1);
  //   setTodoList(newTodoList);
  // }

  // function editTask(index, newValue) {
  //   const newTodoList = [...todoList];
  //   newTodoList[index] = newValue;
  //   setTodoList(newTodoList);
  // }

  // Fetch todo list from the server using axios
  useEffect(() => {
    axios
      .get(API)
      .then((response) => {
        // console.log(response.data.Todo)
        const data = response.data;
        const todos = response.data.map((item) => item.Todo);
        setTodoList(todos);
        // console.log(todos);
        // if (Array.isArray(data)) {
        //   setTodoList(data);
        // }
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setTodoList([]); // Handle errors by setting an empty array
      });
  }, [setTask]);

  // Delete task from the server using axios
  function deleteTask(index) {
    axios
      .delete(`${API}/${index}`)
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setTodoList(data);
        }
      })
      .catch((error) => console.error("Error deleting task:", error));
  }

  // Edit task on the server using axios
  function editTask(index, newValue) {
    axios
      .put(`${API}/${index}`, { task: newValue })
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setTodoList(data);
        }
      })
      .catch((error) => console.error("Error editing task:", error));
  }



  function handleButtonClick() {
    // ...
    console.log('button clicked')
    axios
      .post("http://localhost:5000/todos", { Todo: task })
      .then((response) => {
        const data = response.data;
        // if (data) {
        //   setTodoList([...todoList, data]);
        // } else {
        //   console.error("Invalid response data:", data);
        // }
      })
      .catch((error) => console.error("Error adding task:", error));

    setTask(""); // Clear the input field
  }

  return (
    <Container>
      <ToDoLists
        todoList={todoList}
        // deleteTask={deleteTask}
        // editTask={editTask}
      />
      <ToDoForm
        todoList={todoList}
        setTodoList={setTodoList}
        handleButtonClick={handleButtonClick}
        setTask={setTask}
        task={task}
      />
      <div
        style={{ marginTop: "2rem", color: "#e5d8ce", cursor: "pointer" }}
        onClick={() => navigate("/second")}
      >
        Proceed
      </div>
    </Container>
  );
};
