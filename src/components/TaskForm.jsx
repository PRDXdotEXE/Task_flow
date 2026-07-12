import {useEffect, useState} from "react";

const Taskform = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSumbit = (e) => {
    e.preventDefault();


    const newTask = {
      id: props.editingTask ? props.editingTask.id : undefined,
      title: title,
      description: description,
      priority: priority,
      dueDate: dueDate,
       status:props.editingTask ? props.editingTask.status : "New Task"
    };

    if(props.editingTask){
      props.updateTask(newTask);
    }
    else{
      props.addTasks(newTask);
    }


    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate("");
  };

  useEffect(()=>{
    if (props.editingTask) {
      setTitle(props.editingTask.title);
      setDescription(props.editingTask.description);
      setPriority(props.editingTask.priority);
      setDueDate(props.editingTask.dueDate);
    }
  },[props.editingTask]);

  return (
    <div className="w-full flex justify-center items-center p-6">
      <form
        onSubmit={handleSumbit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-5"
      >
    
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Create New Task</h2>
          <p className="text-sm text-gray-500">
            Fill in the details to get started.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="title"
            className="text-sm font-semibold text-gray-700"
          >
            Title
          </label>
          <input  required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            value={title}
            placeholder="e.g., Design Landing Page"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-gray-700"
          >
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            value={description}
            name="description"
            rows="3"
            placeholder="Describe what needs to be done..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all resize-none"
          ></textarea>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="priority"
            className="text-sm font-semibold text-gray-700"
          >
            Priority
          </label>
          <select
            onChange={(e) => setPriority(e.target.value)}
            id="priority"
            value={priority}
            name="priority"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all"
          >
            <option value="High">🔴 High</option>
            <option value="Med">🟡 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="dueDate"
            className="text-sm font-semibold text-gray-700"
          >
            Due Date
          </label>
          <input
            onChange={(e) => setDueDate(e.target.value)}
            type="date"
            id="dueDate"
            value={dueDate}
            name="date"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer "
        >
          {props.editingTask? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default Taskform;
