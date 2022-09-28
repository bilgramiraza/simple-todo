import { useGetTasksQuery } from '../store/taskSlice';
import TaskItem from './TaskItem';

const AllTasks = () => {
  const { data: tasks, isLoading, isSuccess, isError, error } = useGetTasksQuery();

  let content;
  console.log(tasks);
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = tasks.ids.map((taskId) => (
      <li>
        <TaskItem key={taskId} taskId={taskId} />
      </li>
    ));
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
