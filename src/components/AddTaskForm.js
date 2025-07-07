import React, { useState } from "react";

function AddTaskForm({ onAddTask }) {
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!content.trim()) return;

    onAddTask(content);
    setContent("");
  };

  return (
    <div>
      <form className="add-task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="task-input"
        ></input>
        <button className="add-task-button" type="submit">
          Ekle
        </button>
      </form>
    </div>
  );
}

export default AddTaskForm;
