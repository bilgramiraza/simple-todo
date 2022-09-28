import { useGetTasksQuery } from '../store/taskSlice';

const TaskItem = ({ taskId }) => {
  const { task } = useGetTasksQuery('getTasks', {
    selectFromResult: ({ data }) => ({
      task: data?.entities[taskId],
    }),
  });

  return (
    <article className="task">
      <span>{task.body}</span>
      <button key={task.id} type="button" className="completedBtn">
        Completed
      </button>
    </article>
  );
};

export default TaskItem;
