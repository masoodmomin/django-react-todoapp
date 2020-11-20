import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);
  function fetchTodos() {
    fetch('http://127.0.0.1:8000/api/all/')
    .then(response => response.json())
    .then(data => 
      setTodos(data)
      ).catch(function(error) {
        window.alert(error)
      })
  }

  useEffect(fetchTodos,[])

  useEffect(() => {
    filterHandler();
  }, [todos, category]);

  const filterHandler = () => {
    switch (category) {
      case "Completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "Incomplete":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
  
  return (
    <div className="row d-flex justify-content-center">
      <div className="col-4 align-items-center">
      <TodoForm
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        inputText={inputText}
        category={category}
        setCategory={setCategory}
      />
      <TodoList
        filteredTodos={filteredTodos}
        fetchTodos={fetchTodos}
        setTodos={setTodos}
        todos={todos}
      />
      </div>
    </div>
  );
}
