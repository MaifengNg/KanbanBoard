import { useEffect, useState } from "react";
import Column from "./Column";

function Board(props) {
    var [name, setName] = useState(props.name);
    var [description, setDescription] = useState();

    var [dataToDO, setDataToDO] = useState(props.dataToDO);
    var [dataInProgress, setDataInProgress] = useState(props.dataInProgress);
    var [dataCompleted, setDataCompleted] = useState(props.dataCompleted);

    var [limitTodo, setLimitTodo] = useState(props.limitTodo);
    var [limitInProgress, setLimitInProgress] = useState(props.limitInProgress);
    var [limitCompleted, setLimitCompleted] = useState(props.limitCompleted);


    // We update the state everytime the 
    // user adds a new task
    function updateData(columnName, newTask) {
      if (columnName === "To-Do") {
        dataToDO.push(newTask);
      } else if (columnName === "In Progress") {
        dataInProgress.push(newTask);
      } else {
        dataCompleted.push(newTask);
      }
    }

    // we delete the tasks the user deleted.
    function deleteData(columnName, index) {
      if (columnName === "To-Do") {
        dataToDO.splice(index, 1);
        setDataToDO([...dataToDO]);
      } else if (columnName === "In Progress") {
        dataInProgress.splice(index, 1);
        setDataInProgress([...dataInProgress])
      } else {
        dataCompleted.splice(index, 1);
        setDataCompleted([...dataCompleted])
      }
    }

    // We change the board's name
    function changeBoardName() {
      let newBoardName = document.getElementsByClassName("boardName")[0].value;
      setName(newBoardName);
      props.changeName(props.id, newBoardName);
      name.push(newBoardName);
    }


    // we change the board's description
    function changeBoardDescription() {
      let newBoardDescription = document.getElementsByClassName("boardDescription")[0].value;
      setDescription(newBoardDescription);
      props.changeDescription(newBoardDescription);
    }

    function updateLimit(newLimit) {
    }

    return (
      <div>
        <div className='boardTitleContainer'>
          <button className="allBoardButton" onClick={()=>{
            props.seeAllBoards();
          }}>See all boards!</button>
          <textarea 
            className="boardName"
            placeholder="Board Name"
            onKeyDown={(event)=>{
              if (event.key === 'Enter') {
                  changeBoardName();
              }
          }}>{name[name.length-1]}
          </textarea>
        </div>
        <div className="container">
          <Column name={'To-Do'} data={dataToDO} updateData={updateData} deleteData={deleteData} limit={limitTodo}/>
          <Column name={'In Progress'} data={dataInProgress} updateData={updateData} deleteData={deleteData} limit={limitInProgress}/>
          <Column name={'Completed'} data={dataCompleted} updateData={updateData} deleteData={deleteData} limit={limitCompleted}/>
        </div>
      </div>
    );
}

export default Board;