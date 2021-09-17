import Column from "./Components/Column";
import './App.css'

function App() {
  var data = [
    
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
