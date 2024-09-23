import React, { useEffect, useState } from "react";
import "../resources/home.scss";
import { Container } from "react-bootstrap";
import ToDoForm from "./ToDoForm";
import ToDoLists from "./ToDoLists";

export const Home = () => {
  const [todoList, setTodoList] = useState([]);
  
  return (
    <Container>
      <ToDoLists todoList={todoList}/>
      <ToDoForm todoList={todoList} setTodoList={setTodoList}/>
    </Container>
  );
};
