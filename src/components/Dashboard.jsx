import { useState } from "react";
import Statcard from "./Statcard";
import Taskform from "./TaskForm";
import TaskList from "./TaskList";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Learn React",
      description: "Complete the useState chapter and practice with examples.",
      priority: "High",
      dueDate: "2026-07-08",
      status: "Completed",
    },
    {
      id: 2,
      title: "Build TaskFlow UI",
      description: "Finish the dashboard layout using Tailwind CSS.",
      priority: "Medium",
      dueDate: "2026-07-10",
      status: "Pending",
    },
    {
      id: 3,
      title: "Review JavaScript",
      description: "Practice array methods like map(), filter(), and find().",
      priority: "Low",
      dueDate: "2026-07-12",
      status: "Paused",
    },
  ]);


  const todayStr = new Date().toISOString().split("T")[0];
  const totaltask = tasks.length;
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const inprogress = tasks.filter((task) => task.status === "Pending").length;


  const over_due = tasks.filter(
      (task) => task.status !== "Completed" && task.dueDate < todayStr
  ).length;

  const effiency = totaltask > 0 ? ((completed / totaltask) * 100).toFixed(2) : 0;

  // Handlers
  const addTasks = (newTask) => {
    const newTsks = {
      id: tasks.length + 1, // Note: Consider a more robust ID system if tasks can be deleted
      ...newTask,
    };
    setTasks([...tasks, newTsks]);
  };

  const onDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const onComplete = (id) => {
    setTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id === id ? { ...task, status: "Completed" } : task
        )
    );
  };

  // Fixed: Safely maps over the previous state array
  const onEdit = (updatedTask) => {
    setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
      <div className="min-h-screen">
        <div className="mx-auto px-6 py-10 flex flex-col gap-12">
          <div className="flex divide-x divide-white/10 border-y border-white/10">
            <Statcard number={totaltask} title="Total Tasks" subtitle="All entries" />
            <Statcard number={completed} title="Completed" accent="#5FA88F" />
            <Statcard number={inprogress} title="Pending" subtitle="In progress" />
            <Statcard number={over_due} title="Overdue" subtitle="Needs attention" accent="#D9695F" />
            <Statcard number={effiency} title="Efficiency" subtitle="Monthly target" accent="#E8A33D" />
          </div>

          <div className="flex gap-10 flex-col lg:flex-row">
            <div className="lg:w-1/3">
              <Taskform addTasks={addTasks} length={tasks.length} />
            </div>
            <div className="lg:w-2/3">
              <TaskList
                  onDelete={onDelete}
                  onComplete={onComplete}
                  tasks={tasks}
                  onEdit={onEdit}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;