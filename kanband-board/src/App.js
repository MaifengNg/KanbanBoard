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
                name={[]} limitTodo={[10]} limitInProgress={[10]} limitCompleted={[10]}
                description={[]}/>,
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
  function changeDescription(id, newDescription) {
    let board = boardList[id-1];
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

// import { DndProvider } from 'react-dnd'
// import HTML5Backend from 'react-dnd-html5-backend'
// import React, { useState } from 'react'
// import { useDrop } from 'react-dnd';
// import { useDrag } from 'react-dnd'

// export const PetCard = ({ id, name }) => {
//     const [{ isDragging }, dragRef] = useDrag({
//         type: 'pet',
//         item: { id, name },
//         collect: (monitor) => ({
//             isDragging: monitor.isDragging()
//         })
//     })
//     return (
//         <div className='card' ref={dragRef}>
//             {name}
//             {isDragging && '😱'}
//         </div>
//     )
// }

// const PETS = [
//   { id: 1, name: 'dog' },
//   { id: 2, name: 'cat' },
//   { id: 3, name: 'fish' },
//   { id: 4, name: 'hamster' },
// ]

// export const Basket = () => {
//   const [basket, setBasket] = useState([])
//   const [{ isOver }, dropRef] = useDrop({
//       accept: 'pet',
//       drop: (item) => setBasket((basket) => 
//                           !basket.includes(item) ? [...basket, item] : basket),
//       collect: (monitor) => ({
//           isOver: monitor.isOver()
//       })
//   })

//   return (
//       <React.Fragment>
//           <div className='pets'>
//               {PETS.map(pet => <PetCard draggable id={pet.id} name={pet.name} />)}
//           </div>
//           <div className='basket' ref={dropRef}>
//               {basket.map(pet => <PetCard id={pet.id} name={pet.name} />)}
//               {isOver && <div>Drop Here!</div>}
//           </div>
//       </React.Fragment>
//   )
// }

// export const App = () => {
//   return (
//     <DndProvider backend={HTML5Backend}>
//       {/* Here, render a component that uses DND inside it */}
//       <Basket />
//     </DndProvider>
//   )
// }

// export default App