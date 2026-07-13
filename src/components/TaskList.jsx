import TaskCard from "./TaskCard";

const TaskList = (props) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        id="card_container"
        className="flex flex-col h-[70vh] p-8 rounded-2xl gap-1.5 overflow-y-auto "
      >
        {props.tasks.map((e) => {
          return (
            <div key={e.id}>
              <TaskCard
                id={e.id}
                title={e.title}
                description={e.description}
                priority={e.priority}
                dueDate={e.dueDate}
                status={e.status}
                onDelete={props.onDelete}
                onComplete={props.onComplete}

                startEditing={() => props.startEditing(e)}
              />

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
