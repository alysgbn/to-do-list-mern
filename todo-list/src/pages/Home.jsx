import React, { useEffect, useState } from "react";
import "../resources/home.scss";
import { Container } from "react-bootstrap";
import ToDoForm from "./ToDoForm";
import ToDoLists from "./ToDoLists";

export const Home = () => {
  const [todoList, setTodoList] = useState([]);

  function deleteTask(index) {
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }


  function editTask(index, newValue) {
    const newTodoList = [...todoList];
    newTodoList[index] = newValue;
    setTodoList(newTodoList);
  }

  return (
    <Container>
      <ToDoLists todoList={todoList} deleteTask={deleteTask} editTask={editTask}/>
      <ToDoForm todoList={todoList} setTodoList={setTodoList} />
    </Container>
  );
};
