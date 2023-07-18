import React, { useCallback, useEffect, useState } from "react";
import Todo from "./UI/Todo";
import "./App.css";
import TodoForm from "./Form/TodoForm";

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const todos = await response.json();
      setTodos(todos);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const deleteTodosHandler = (deletedTodoId) => {
    setTodos((current) =>
      current.filter((todo) => {
        return todo.id !== deletedTodoId;
      })
    );
  };

  const updateTodoHandler = (updatedTodoId) => {
    fetchTodos();
  };

  const createTodoHandler = async () => {
    fetchTodos();
  };

  return (
    <section>
      <TodoForm onAdd={createTodoHandler} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
          onDelete={deleteTodosHandler}
          onUpdate={updateTodoHandler}
        />
      ))}
    </section>
  );
};

export default App;
