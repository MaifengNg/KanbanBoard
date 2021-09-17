import Column from "./Components/Column";
import './App.css'

function App() {
  var data = [
    {'id': 1, 'name': 'task 1'},
    {'id': 2, 'name': 'task 2'},
    {'id': 3, 'name': 'task 3'}
  ];

  return (
    <div className="container">
      <Column name={'To-Do'} data={data}/>
      <Column name={'In Progress'} data={data}/>
      <Column name={'Completed'} data={data}/>
    </div>
  );
}

export default App;
