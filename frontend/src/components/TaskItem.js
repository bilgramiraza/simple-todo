import { useDeleteTaskMutation, useGetTasksQuery } from '../store/taskSlice';

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

  return (
    <article className="task">
      <span>{task.body}</span>
      <button key={task.id} type="button" className="completedBtn">
        Completed
      </button>
      <button
        key={task.id}
        type="button"
        className="deleteBtn"
        onClick={onDeleteTaskClicked}
      ></button>
    </article>
  );
};

export default TaskItem;
