const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "React projesini kur" },
    "task-2": { id: "task-2", content: "State yapısını planla" },
    "task-3": { id: "task-3", content: "react-beautiful-dnd kur" },
    "task-4": { id: "task-4", content: "Componentleri oluştur" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "📝 Yapılacaklar",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "⏳ Yapılıyor",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "✅ Bitti",
      taskIds: [],
    },
  },

  columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialData;
