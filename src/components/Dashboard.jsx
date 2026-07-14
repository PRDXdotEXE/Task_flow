import {useEffect, useState} from "react";
import Statcard from "./Statcard";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const Dashboard = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            try {
                return JSON.parse(savedTasks);
            } catch (e) {
                console.error("Error parsing tasks from localStorage", e);
                return [];
            }
        }
        return [];
    });
    const [sort, setSort] = useState("newest");
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const todayStr = new Date().toISOString().split("T")[0];
    const totaltask = tasks.length;
    const completed = tasks.filter((task) => task.status === "Completed").length;
    const progress = tasks.filter((task) => task.status === "Pending").length;
    const [editingTask, setEditingTask] = useState(null);

    const over_due = tasks.filter(
        (task) => task.status !== "Completed" && task.dueDate < todayStr,
    ).length;

    const efficiency =
        totaltask > 0 ? ((completed / totaltask) * 100).toFixed(2) : 0;

    const addTasks = (newTask) => {
        const NewTasks = {
            id: crypto.randomUUID(),
            ...newTask,
        };
        setTasks([...tasks, NewTasks]);
    };

    const onDelete = (id) => {

        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };
    const startEditing = (task) => {
        setEditingTask(task);
    };
    const onComplete = (id) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? {...task, status: "Completed"} : task,
            ),
        );
    };

    const updateTask = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task,
            ),
        );

        setEditingTask(null);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const filteredTasks = tasks.filter((task) => {
        const matchedSearch = task.title
            .toLowerCase()
            .includes(search.toLowerCase());

        let matchedFilter = false;
        if (filter === "all") {
            matchedFilter = true;
        } else if (filter === "overdue") {
            matchedFilter = task.status !== "Completed" && task.dueDate < todayStr;
        } else {
            matchedFilter = task.status.toLowerCase() === filter;
        }

        return matchedSearch && matchedFilter;
    });
    const sortedTasks = filteredTasks.slice().sort((a, b) => {
        if (sort === "duedate") {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }

        if (sort === "priority") {
            const priorityOrder = {High: 3, Medium: 2, Low: 1};

            return priorityOrder[b.priority] - priorityOrder[a.priority];

        }


        if (sort === "oldest") {
            return 0;
        }


        return 0;
    });
    if (sort === "newest") {
        sortedTasks.reverse();
    }

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
    return (
        <div className="min-h-screen  ">
            <div className="mx-auto px-6 py-10 flex flex-col gap-12">
                <div className="flex divide-x divide-white/10 border-y border-white/10">
                    <Statcard
                        number={totaltask}
                        title="Total Tasks"
                        subtitle="All entries"
                    />
                    <Statcard number={completed} title="Completed" accent="#5FA88F"/>
                    <Statcard number={progress} title="Pending" subtitle="In progress"/>
                    <Statcard
                        number={over_due}
                        title="Overdue"
                        subtitle="Needs attention"
                        accent="#D9695F"
                    />
                    <Statcard
                        number={efficiency}
                        title="Efficiency"
                        subtitle="Monthly target"
                        accent="#E8A33D"
                    />
                </div>

                <div className="flex gap-10 flex-col lg:flex-row">
                    <div className="lg:w-1/3">
                        <TaskForm
                            addTasks={addTasks}
                            updateTask={updateTask}
                            editingTask={editingTask}
                            length={tasks.length}
                        />
                    </div>
                    <div className="lg:w-2/3">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
                            <p className="text-sm text-gray-500">
                                Manage and track your daily checklist
                            </p>
                        </div>
                        <div className="flex mt-2  justify-around">
                            <input
                                id="search"
                                placeholder="Search..."
                                value={search}
                                onChange={handleSearch}
                                className="border-2 border-solid py-3 px-4 rounded-2xl small"
                            />

                            <select
                                value={filter}
                                onChange={(e) => {
                                    setFilter(e.target.value);
                                }}
                                id="status-filter"
                                className="w-auto bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-10 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-all duration-200"
                            >
                                <option value="all">🌐 All Tasks</option>
                                <option value="pending">⏳ Pending</option>
                                <option value="completed">✅ Completed</option>
                                <option value="overdue">🚨 Overdue</option>
                            </select>

                            <select
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value);
                                }}
                                id="status-filter"
                                className="w-auto bg-white border border-gray-300 text-gray-700 py-2.5 px-4 pr-10 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-all duration-200"
                            >
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="priority">Priority</option>
                                <option value="duedate">Due Date</option>
                            </select>
                        </div>
                        {filteredTasks.length === 0 ? (
                            <p className="text-gray-500 mt-4">No task found 🚫</p>
                        ) : (
                            <TaskList
                                onDelete={onDelete}
                                onComplete={onComplete}
                                tasks={sortedTasks}

                                startEditing={startEditing}
                            />
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
