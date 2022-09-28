import './App.css';
import AddTask from './components/AddTask';
import AllTasks from './components/AllTasks';

function App() {
  return (
    <section>
      <h1>Simple Todo List</h1>
      <AllTasks />
      <AddTask />
    </section>
  );
}

export default App;
