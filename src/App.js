import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [nweItem, setState] = useState("");
  const [todos, setTodos] = useState(() => {
    const localvalue = localStorage.getItem("ITEMS");
    if (localvalue == null) return [];
    return JSON.parse(localvalue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID, title: nweItem, completed: false },
      ];
    });
    setState("");
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <div className="main-div">
      <h1>To Do App</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={nweItem}
          onChange={(e) => setState(e.target.value)}
          type="text"
          id="item"
        />
        <button>Add</button>
      </form>
      <h1>To do List</h1>
      <ul>
        {todos.length === 0 && "No To Do to add here"}
        {todos.map((todo) => {
          return (
            <li key={todos.id}>
              <lable>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </lable>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
