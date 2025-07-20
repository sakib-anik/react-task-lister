import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
export default function TaskBoard() {
  const [tasks, setTasks] = useState([
    {
      id: crypto.randomUUID(),
      isFavorite: false,
      title: "Learn React",
      desc: "I am a Programmar",
      tags: ["web", "app", "drama"],
      priority: "High",
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleSave = (newtask, isAdd) => {
    if (isAdd) setTasks([...tasks, newtask]);
    else
      setTasks(
        tasks.map((task) => {
          if (task.id === newtask.id) {
            return newtask;
          }
          return task;
        })
      );
    setShowModal(false);
  };

  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleEdit = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };

  const handleDelete = (newtask) => {
    setTasks(tasks.filter((task) => task.id !== newtask.id));
  };

  const handleFav = (newtask) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === newtask.id) {
          return {
            ...task,
            isFavorite: !task.isFavorite,
          };
        }
        return task;
      })
    );
  };

  const handleSearch = (searchTerm) => {
    setTasks(
      tasks.filter((task) => {
        if (task.title.toLowerCase().includes(searchTerm.toLowerCase()))
          return task;
      })
    );
  };

  return (
    <section className="mb-20" id="tasks">
      {showModal && (
        <TaskModal
          taskToUpdate={taskToUpdate}
          onCloseModal={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
      <div className="container">
        <SearchTask onSearch={handleSearch} />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onDeleteAll={() => setTasks([])}
            onShowModal={() => {
              setShowModal(true);
              setTaskToUpdate(null);
            }}
          />
          {tasks.length > 0 ? (
            <TaskList
              onFav={handleFav}
              onEdit={handleEdit}
              tasks={tasks}
              onDelete={handleDelete}
            />
          ) : (
            <h1>No Task Found</h1>
          )}
        </div>
      </div>
    </section>
  );
}
