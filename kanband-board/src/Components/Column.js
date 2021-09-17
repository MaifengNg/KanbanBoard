import {useState} from 'react'
import "./Styles.css"
import Card from "./Card";

function Column(props) {
    var dataArray = props.data;
    var test = [];
    for (var i = 0; i < dataArray.length; i++) {
        const name = dataArray[i].name
        test.push(
            <Card name={name}/>
        )
    }

    var showNewCardForm = false;

    function addNewCard() {
        test.push(
            <Card name={'oi'}/>
        )
        showNewCardForm = true;
    }

    return(
        <div className="column">
            <h1 >
                {props.name}
                {test}
            </h1>
            <div className = 'card' >
                <textarea id='textarea' placeholder="Add new task!" className='textarea'>
                </textarea>
                <button id='newTask' className='saveButton' onClick={() => {
                    const newTaskToAdd = document.getElementById("textarea").value;
                    console.log(newTaskToAdd)
                    document.getElementById("textarea").value=null;
                }}> 
                    Save task
                </button>
            </div>
        </div>
    )
}

export default Column;