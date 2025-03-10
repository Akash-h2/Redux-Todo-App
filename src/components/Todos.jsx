import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditClick = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const handleUpdate = () => {
    dispatch(updateTodo({ id: editId, text: editText }));
    setEditId(null);
  };

  return (
    <div className="p-6 mt-10 max-w-lg mx-auto h-100 overflow-y-scroll scroll-smooth bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-white text-xl font-semibold mb-4">Your Todos ✅</h2>

      {todos.length === 0 ? (
        <p className="text-gray-400 text-center">No todos yet. Add some! 📝</p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-800 p-3 rounded-md shadow-sm"
            >
              {editId === todo.id ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    className="flex-1 border border-gray-600 bg-gray-700 text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md text-white transition"
                  >
                    ✅ Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <span className="text-gray-200 text-lg">{todo.text}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(todo)}
                      className="bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md text-white transition"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => dispatch(removeTodo(todo.id))}
                      className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-white transition"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todos;
