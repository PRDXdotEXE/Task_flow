import TaskCard from "./TaskCard";

const TaskList = (props) => {


  
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
        <p className="text-sm text-gray-500">
          Manage and track your daily checklist
        </p>
      </div>
      
     
      <div
        id="card_container" 
        className="flex flex-col h-[70vh] p-8 rounded-2xl gap-1.5 overflow-y-auto "
      >
        {props.tasks.map((e) => {
          return (
            <TaskCard   key={e.id}
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
          );
        })}
        
      </div>
    </div>
  );
};

export default TaskList;