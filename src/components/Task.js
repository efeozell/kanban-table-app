import React from "react";
import { Draggable } from "@hello-pangea/dnd";

function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task ${snapshot.isDragging ? "is-dragging" : " "}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
}

export default Task;
