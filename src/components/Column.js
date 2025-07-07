import React, { useState } from "react";
import Task from "./Task";
import { Droppable } from "@hello-pangea/dnd";

function Column({ column, tasks }) {
  //Droppable ile sarmaladıgımız kısımdan sonra bir arrow function yazdık ve proplarını verdik ardından içine bir div oluşturduk ve classnameini koşuulu olara yazdık
  //2 tane ref verdik birisi innerRef divin doğrudan manipüle edilebilmesi içib verilen bir referanstır droppableProps ise taşınma yetisini kazandımrk içi verilmiştir
  return (
    <div className="column">
      <h3 className="column-title">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={`task-list ${snapshot.isDraggingOver ? "is-over" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
