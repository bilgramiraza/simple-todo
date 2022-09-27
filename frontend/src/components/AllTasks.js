import { useGetTasksQuery } from '../store/taskSlice';

const AllTasks = () => {
  const { data: tasks, isLoading, isSuccess, isError, error } = useGetTasksQuery();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = <p>{tasks}</p>;
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return <div>{content}</div>;
};

export default AllTasks;
