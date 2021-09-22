import { useState, useCallback } from "react";
import Column from "./Column";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import Backend from "react-dnd-html5-backend";

function Board(props) {
    var [name, setName] = useState(props.name);
    var [description, setDescription] = useState(props.description);

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
      name.splice(0, name.length, newBoardName);
    }


    // we change the board's description
    function changeBoardDescription() {
      let newBoardDescription = document.getElementsByClassName("boardDescription")[0].value;
      setDescription(newBoardDescription);
      props.changeDescription(props.id, newBoardDescription);
      description.splice(0, description.length, newBoardDescription);
    }

    // update the entire data array
    function updateArray(columnName, updatedTaskArray) {

      if (columnName === 'To-Do') {
        dataToDO.splice(0, dataToDO.length, ...updatedTaskArray)
        setDataToDO([...dataToDO])
      } else if (columnName === 'In Progress') {
        dataInProgress.splice(0, dataInProgress.length, ...updatedTaskArray)
        setDataInProgress([...dataInProgress])
      } else {
        dataCompleted.splice(0, dataCompleted.length, ...updatedTaskArray)
        setDataCompleted([...dataCompleted])
      }
    }

    // Update column when cards are being dragged from one column to another
  

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
          <textarea 
            className="boardDescription"
            placeholder="Board Description"
            onKeyDown={(event)=>{
              if (event.key === 'Enter') {
                  changeBoardDescription();
              }
          }}>{description[description.length-1]}
          </textarea>
        </div>
        <div className="container">
          <DndProvider backend={Backend}>
            <Column name={'To-Do'} data={dataToDO} updateData={updateData} deleteData={deleteData} limit={limitTodo} updateArray={updateArray} />
            <Column name={'In Progress'} data={dataInProgress} updateData={updateData} deleteData={deleteData} limit={limitInProgress} updateArray={updateArray} />
            <Column name={'Completed'} data={dataCompleted} updateData={updateData} deleteData={deleteData} limit={limitCompleted} updateArray={updateArray} />
          </DndProvider>
        </div>
      </div>
    );
}

export default Board;