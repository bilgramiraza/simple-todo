import { useGetTasksQuery } from '../store/taskSlice';
import TaskItem from './TaskItem';

const AllTasks = () => {
  const { data: tasks, isLoading, isSuccess, isError, error } = useGetTasksQuery('getTasks');

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = tasks.ids.map((taskId) => <TaskItem key={taskId} taskId={taskId} />);
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return (
    <section>
      <ul>{content}</ul>
    </section>
  );
};

export default AllTasks;
