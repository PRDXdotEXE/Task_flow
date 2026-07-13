const TaskCard = ({
  id,
  title,
  description,
  priority,
  dueDate,
  status,
  onDelete,
  onComplete,
  startEditing,
}) => {
  return (
    <div className="flex ">
      <article className="w-[50%]  relative flex flex-col gap-3 p-4 border-2 rounded-3xl border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold flex items-center gap-1">
          <span>📌</span> {title}
        </h2>

        <p className="text-gray-600">{description}</p>

        <div className="text-sm text-gray-500 space-y-1">
          <p>
            <span className="font-semibold">Priority:</span> {priority}
          </p>
          <p>
            📅 <span className="font-semibold">Due Date:</span> {dueDate}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {status}
          </p>
          <button
            onClick={() => onDelete(id)}
            className="absolute top-2 right-2  bg-red-500 text-sm font-bold text-white px-4 py-2 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer "
          >
            X
          </button>
          <div className="flex justify-between">
            <button
              onClick={() => onComplete(id)}
              className="  bg-green-500  font-bold text-white rounded-full flex px-3 py-2 mt-3 items-center justify-center hover:bg-green-700 transition-colors cursor-pointer self-center "
            >
              Completed
            </button>
            <button
              onClick={startEditing}
              className="  bg-blue-500  font-bold text-white rounded-full flex px-3 py-2 mt-3 items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer self-center "
            >
              Edit
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default TaskCard;
