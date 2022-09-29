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
    <li key={taskId} className="task">
      <span>{task?.task}</span>
      <button type="button" className="completedBtn" onClick={onTaskCompleteClicked}>
        {task?.isComplete ? 'Done' : 'Complete'}
      </button>
      <button type="button" className="deleteBtn" onClick={onDeleteTaskClicked}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
