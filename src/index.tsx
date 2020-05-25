import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";

//creating an alias in typescript
type FormElem = React.FormEvent<HTMLFormElement>;

//creating an Interface
interface ITodo {
  textTodo: string;
  complete: boolean;
}

export default function App(): JSX.Element {
  //setting a tipe to a hook
  const [value, setValue] = useState<string>("");
  //setting interface to a hook
  const [todos, setTodos] = useState<ITodo[]>([]);

  const addTodo = (textTodo: string): void => {
    const newTodo: ITodo[] = [...todos, { textTodo, complete: false }];
    setTodos(newTodo);
  };

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const completeTodo = (index: number): void => {
    const updateTodo: ITodo[] = [...todos];
    updateTodo[index].complete = !updateTodo[index].complete;
    setTodos(updateTodo);
  };

  const removeTodo = (index: number): void => {
    const removeTodo: ITodo[] = [...todos];
    removeTodo.splice(index,1);
    setTodos(removeTodo);
  };

  return (
    <Fragment>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          type="text"
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button type="submit">Add Todo</button>
      </form>
      <section>
        {todos &&
          todos.map((todo: ITodo, index: number) => (
            <div key={index}>
              <h1
                style={{ textDecoration: todo.complete ? "line-through" : "" }}
              >
                {todo.textTodo}
              </h1>
              <p>
                <strong>Status:</strong>
                {todo.complete ? "Complete" : "Incomplete"}
              </p>
              <button type="button" onClick={() => completeTodo(index)}>
                Update Status
              </button>
              <button type="button" onClick={() => removeTodo(index)}>
                Remove
              </button>
            </div>
          ))}
      </section>
    </Fragment>
  );
}

const root = document.getElementById("app-root");

ReactDOM.render(<App />, root);
