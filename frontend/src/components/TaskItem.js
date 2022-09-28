import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useToggleTaskCompletionMutation,
} from '../store/taskSlice';

const TaskItem = ({ taskId }) => {
  const { task } = useGetTasksQuery('getTasks', {
    selectFromResult: ({ data }) => ({
      task: data?.entities[taskId],
    }),
  });
  const [deleteTask] = useDeleteTaskMutation();
  const onDeleteTaskClicked = async () => {
    try {
      await deleteTask({ id: taskId }).unwrap();
    } catch (error) {
      console.error('failed to Delete the Task', error);
    }
  };
  const [toggleTaskCompletion] = useToggleTaskCompletionMutation();
  const onTaskCompleteClicked = () => {
    const status = !task.isComplete;
    toggleTaskCompletion({ id: task.id, isComplete: status });
  };
  return (
    <article className="task">
      <span>{task.body}</span>
      <button key={task.id} type="button" className="completedBtn" onClick={onTaskCompleteClicked}>
        Completed
      </button>
      <button key={task.id} type="button" className="deleteBtn" onClick={onDeleteTaskClicked}>
        Delete
      </button>
    </article>
  );
};

export default TaskItem;
