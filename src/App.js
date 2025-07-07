import "./App.css";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import initialData from "./initial-data";
import Column from "./components/Column";
import AddTaskForm from "./components/AddTaskForm";
import { v4 as uuidv4 } from "uuid";
import Task from "./components/Task";
//datanın içinden columnOrderı maple columIdden fonskiyon oluştur
//  iki tane veri tanımla column ve tasks  colum= datadan columnsa onun ıncndende
// idye gitsin tasks ise columndan taskIdsi maple taskIdye den data tasksın ıcınden taskIdte

function App() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("kanbanData");

    return savedData ? JSON.parse(savedData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("kanbanData", JSON.stringify(data));
  }, [data]);

  const handleAddTask = (content) => {
    const newTaskId = uuidv4();

    const newTask = {
      id: newTaskId,
      content: content,
    };

    const newTasks = {
      ...data.tasks,
      [newTaskId]: newTask,
    };

    const toDoColumn = data.columns["column-1"];
    const newToDoTaskIds = [...toDoColumn.taskIds, newTaskId];

    const newToDoColumn = {
      ...toDoColumn,
      taskIds: newToDoTaskIds,
    };

    const newState = {
      ...data,
      tasks: newTasks,
      columns: {
        ...data.columns,
        [newToDoColumn.id]: newToDoColumn,
      },
    };

    setData(newState);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);

      newTaskIds.splice(source.index, 1);

      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    const startTaskIds = Array.from(startColumn.taskIds);

    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);

    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };
    setData(newState);
  };

  return (
    <div>
      <AddTaskForm onAddTask={handleAddTask} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {data &&
            data.columnOrder &&
            data.columnOrder.map((columnId) => {
              //columnları çekiyoruz column-1 column-2 olarak ve bunları columnIdye eşitliyoruz. ilk döngüde columnId colums-1 ikinci döngüde columns-2 olur
              const column = data.columns[columnId]; //Bu satır, o anki columnId'yi kullanarak data.columns objesinden ilgili sütunun tüm bilgilerini alır.
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]); //Bu map işleminde yukarıdaki colum objesinin içindeki taskIdleri gezer

              return <Column key={column.id} column={column} tasks={tasks} />;
            })}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
