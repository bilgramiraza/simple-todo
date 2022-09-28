import { useState } from 'react';
import { useAddNewTaskMutation } from '../store/taskSlice';

const AddTask = () => {
  const [task, setTask] = useState('');
  const [addNewTask, { isLoading }] = useAddNewTaskMutation();

  const onTaskInputChanged = (e) => setTask(e.target.value);
  const canSave = task && !isLoading;

  const onTaskSubmit = async () => {
    if (canSave) {
      try {
        await addNewTask(task).unwrap();

        setTask('');
      } catch (error) {
        console.error('Failed to save Task: ', error);
      }
    }
  };

  return (
    <form>
      <input
        type="text"
        name="taskInput"
        id="taskInput"
        value={task}
        onChange={onTaskInputChanged}
      />
      <button type="submit" onClick={onTaskSubmit}>
        Add Task
      </button>
    </form>
  );
};

export default AddTask;
