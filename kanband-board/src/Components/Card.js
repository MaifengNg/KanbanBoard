import "./Styles.css"

function Card(props) {
    
    return(
        <div className='card'>
            <h2>
                {props.name}
            </h2>
        </div>
    )
}

export default Card;