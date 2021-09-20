import "./Styles.css"

function Card(props) {

    return(
        <div className='card'>
            <h2 className='cardText'>
                {props.name}
            </h2>
            <button 
                className='deleteButton' 
                onClick={()=>{
                    props.deleteTask(props.id);
                }}
            > 
            Delete task
            </button>
        </div>
    )
}

export default Card;