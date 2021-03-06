import { useState, useCallback, useEffect } from "react";
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

    var [test, setTest] = useState([]);

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
    const [{ isOver }, dropRef] = useDrop({
      accept: 'item',
      drop: (item, monitor) => setTest(() => {
        console.log(item)
        const dropResult = monitor.getDropResult();

        let dragCardIndex = item.index[1];
        let dragCardName = item.index[0];

        let replaceCardIndex = item.id[1];
        let replaceCardName = item.id[0];
        
        let boardNameDrag = item.index[2];
        let boardNameDropped = dropResult.targetName;

        if (boardNameDropped === boardNameDrag) {

          if (boardNameDropped === 'To-Do') {
            dataToDO.splice(dragCardIndex, 1, replaceCardName);
            dataToDO.splice(replaceCardIndex, 1, dragCardName);
            dataToDO = [...dataToDO]
            return dataToDO
          } else if (boardNameDropped === 'In Progress') {
            dataInProgress.splice(dragCardIndex, 1, replaceCardName);
            dataInProgress.splice(replaceCardIndex, 1, dragCardName);
            dataInProgress = [...dataInProgress]
            return dataInProgress
          } else {
            dataCompleted.splice(dragCardIndex, 1, replaceCardName);
            dataCompleted.splice(replaceCardIndex, 1, dragCardName);
            dataCompleted = [...dataCompleted]
            return dataCompleted
          }

        } else {
          
          if (boardNameDropped === 'To-Do') {
            if (dataToDO.length < limitTodo) {
              dataToDO.splice(replaceCardIndex, 0, dragCardName);
              dataToDO = [...dataToDO]
            } else {
              return;
            }
            
          } else if (boardNameDropped === 'In Progress') {
            if (dataInProgress.length < limitInProgress) {
              dataInProgress.splice(replaceCardIndex, 0, dragCardName);
              dataInProgress = [...dataInProgress]
            } else {
              return;
            }
          } else {
            if (dataCompleted.length < limitCompleted) {
              dataCompleted.splice(replaceCardIndex, 0, dragCardName);
              dataCompleted = [...dataCompleted]
            } else {
              return;
            }
          }

          if (boardNameDrag === 'To-Do') {
            dataToDO.splice(dragCardIndex, 1);
            setDataToDO(dataToDO)
            return dataToDO
          } else if (boardNameDrag === 'In Progress') {
            dataInProgress.splice(dragCardIndex, 1);
            setDataInProgress(dataInProgress)
            return dataInProgress
          } else {
            dataCompleted.splice(dragCardIndex, 1);
            setDataCompleted(dataCompleted)
            return dataCompleted
          }
        }
          
      }),
      collect: (monitor) => ({
          isOver: monitor.isOver()
      })
  })

    useEffect(()=>{return;})
  

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
        <div className="container" ref={dropRef}>
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