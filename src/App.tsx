import { MouseEvent, KeyboardEvent, useState } from "react";

type TodoItems = {
  text: string;
  done: boolean;
};

//! IMPLEMENT EDIT
function App() {
  const [newTodo, setNewTodo] = useState<string>("");
  const [todo, setTodo] = useState<TodoItems[]>([]);

  const handleAddTodo = (e: KeyboardEvent | MouseEvent, key: boolean = false): void => {
    setTodo([...todo, { text: newTodo, done: false }]);
    if (key) {
      (e.target as HTMLButtonElement).value = "";
    } else {
      ((e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement).value = "";
    }
  };

  const handleRemoveTodo = (i: number): void => {
    setTodo(todo.filter((_, todoI) => todoI !== i));
  };

  const handleMarkTodo = (i: number): void => {
    const newState = todo.map((t, todoI) => {
      if (todoI === i) {
        return { ...t, done: !t.done };
      } else return t;
    });

    setTodo(newState);
  };

  return (
    <div className="max-w-[1000px] flex flex-col gap-20 mx-auto my-20">
      <div className="flex flex-col gap-10 bg-gray-700  p-10">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold">Habit Tracker</h1>
          <div className="flex flex-row gap-2">
            <button className="px-3 py-1 bg-gray-500 font-bold">ADD</button>
          </div>
        </div>

        <div className="flex flex-col">
          <p>List is empty</p>
        </div>
      </div>

      <div className="flex flex-col gap-10 bg-gray-700 p-10">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold">TODO List</h1>
          <div className="flex flex-row gap-2">
            <input
              className="bg-slate-200 text-black w-96 px-2"
              type="text"
              placeholder="Enter your task"
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTodo(e, true);
                }
              }}
            />
            <button className="px-3 py-1 bg-gray-500 font-bold" onClick={(e) => handleAddTodo(e)}>
              ADD
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {todo.length === 0 && <p>List is empty</p>}
          {todo.map((t, i: number) => (
            <div className={`flex flex-row justify-between items-center p-5  ${t?.done ? "bg-slate-600" : "bg-slate-800"}`} key={i}>
              <p className={`text-xl font-bold ${t?.done && "line-through"}`}>{t.text}</p>
              <div className="flex flex-row items-center gap-5">
                <button className="px-3 py-1 bg-gray-500 font-bold" onClick={() => handleRemoveTodo(i)}>
                  REMOVE
                </button>
                <button className="px-3 py-1 bg-gray-500 font-bold" onClick={() => handleMarkTodo(i)}>
                  {t?.done ? "MARK AS UNDONE" : "MARK AS DONE"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
