const TodoItem = ({ data, handleMarkTodo, handleRemoveTodo, i, getUrl }) => {
  return (
    <div className={`flex flex-row justify-between items-center h-20`} key={i}>
      <div className="w-full h-full flex items-center cursor-pointer gap-3" onClick={() => handleMarkTodo(i)}>
        <input type="checkbox" className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800" checked={data?.done ? true : false} />
        <p className={`text-xl font-bold ${data?.done && "line-through"}`}>{data.text}</p>
      </div>
      <div className="flex flex-row items-center gap-5">
        <button className="h-10 w-10 py-1 font-bold" onClick={() => handleRemoveTodo(i)}>
          <img className="m-auto" src={getUrl("icons/trash3-fill-alt.svg")} alt="delete-icon" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
