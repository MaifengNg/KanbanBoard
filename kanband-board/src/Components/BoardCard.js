import './App.css'

function BoardCard(props) {
    return (
        <div
            className="addBoardCard" 
            onClick={()=>{
              setAddBoardDetails(false);
              setAddNewBoardCard(false);
              setShowBoard(currentBoard);
            }}>
            <h2 className="addBoardCardContainer">Name: {boardList[i].name}</h2>
            <h4 className="addBoardCardContainer">Description: {boardList[i].description} </h4>
        </div>
    )
}

export default BoardCard;