import Board from "./Components/Board";
import { useState } from "react";
import './App.css'

function App() {
  const [showBoard, setShowBoard] = useState(null);
  const [addNewBoardCard, setAddNewBoardCard] = useState(true);
  var [boardList, setBoardList] = useState([])

  // We add the new board into the board list
  function addNewBoard() {
    var newBoardList = [...boardList];
    newBoardList.push({
      "id": boardList.length+1,
      "board": <Board seeAllBoards={seeAllBoards}
                dataToDO={[]} dataInProgress={[]} dataCompleted={[]} id={boardList.length+1} 
                changeName={changeName} changeDescription={changeDescription}
                name={[]} limitTodo={[10]} limitInProgress={[10]} limitCompleted={[10]}/>,
    });
    boardList = newBoardList;
    setBoardList(newBoardList);
  }

  // We return all previous boards
  function allBoards() {
    let showBoardArray = [];
    for (var i = 0; i< boardList.length; i++) {
      let currentBoard = boardList[i].board;
      let currentBoardName = currentBoard.props.name[currentBoard.props.name.length-1];
      if (currentBoardName === undefined && currentBoard.props.name.length === 0) {
        currentBoardName = "Board name";
      }
      showBoardArray.push(
        <div
            className="addBoardCard" 
            onClick={()=>{
              setAddNewBoardCard(false);
              setShowBoard(currentBoard);
            }}>
            <h4 className="addBoardCardContainer">{currentBoardName}</h4>
        </div>)
    };

    return showBoardArray;
  }

  // We return the add board card 
  function getAddBoardCard() {
    return (
      <div 
          className="addBoardCard" 
          onClick={()=>{
            setAddNewBoardCard(false);
            addNewBoard();
            let newBoard = boardList[boardList.length-1].board;
            setShowBoard(newBoard);
          }}>
          <div className="addBoardCardContainer">
            <h1> Add a new board! </h1>
          </div>
        </div>
    )
  }

  // If there are no previous boards added,
  // we show the add board card else
  // we show all previous board + add board card
  function showAddNewBoardCard() {
    if (addNewBoardCard) {
      if (boardList.length === 0) {
        return (
          getAddBoardCard()
        )
      } else {
        let allBoardArrays = allBoards();
        return (
          <div>
            {allBoardArrays}
            {getAddBoardCard()}
          </div>
        )
      }
      
    }
  }

  // We create a new board
  function createNewBoard() {
    setAddNewBoardCard(false);
    addNewBoard();
    let currentBoard = boardList[boardList.length-1].board;
    setShowBoard(currentBoard);
  }

  // We call this function to see all previous boards
  function seeAllBoards() {
    setAddNewBoardCard(true);
    setShowBoard(null);
  }

  // Change board name
  function changeName(id, newName) {
    let board = boardList[id-1];
    board.name = newName;
  }

  // Change board description
  function changeDescription(newDescription) {
    let board = boardList[0];
    board.description = newDescription;
  }

  return (
    <div>
      {showAddNewBoardCard()}
      {showBoard}
    </div>
  );
}

export default App;
