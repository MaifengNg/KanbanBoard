import Column from "./Components/Column";

function App() {
  const styles = {
    column: {
      backgroundColor: 'red',
      align: 'centre'
    }
  }
  return (
    <div >
      <Column style={styles.column} name={'To do'}/>
      <Column style={styles.column} name={'In Progress'}/>
      <Column style={styles.column} name={'Completed'}/>
    </div>
  );
}

export default App;
