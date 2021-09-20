import {useEffect, useState} from 'react'
import "./Styles.css"
import Card from "./Card";

function Column(props) {
    const [maxCards, setMaxCards] = useState(10);
    var [taskArray, setTaskArray] = useState([])

    function addNewtask(newTask) {
        var newTaskArray = [...taskArray, newTask];
        setTaskArray(newTaskArray);
    }

    function getNewtaskToAdd() {
        const newTaskArray = document.getElementsByClassName("textArea");
        var newTaskToAdd;
        if (props.name === 'To-Do') {
            newTaskToAdd = newTaskArray[0].value;
        } else if(props.name === 'In Progress') {
            newTaskToAdd = newTaskArray[1].value;
        } else {
            newTaskToAdd = newTaskArray[2].value;
        }
        return newTaskToAdd;
    }

    function resetAddTaskCard() {
        const newTaskArray = document.getElementsByClassName("textArea");
        if (props.name === 'To-Do') {
            newTaskArray[0].value = null;
        } else if(props.name === 'In Progress') {
            newTaskArray[1].value = null;
        } else {
            newTaskArray[2].value = null;
        }
    }

    function deleteTask(index) {
        let newTaskArray = [...taskArray];
        newTaskArray.splice(index, 1)
        setTaskArray(newTaskArray);
    }

    function userSetMaxCard() {
        const maxCardNumberArray = document.getElementsByClassName("cardLimitSet");
        let maxCardNumber;
        if (props.name === 'To-Do') {
            maxCardNumber = maxCardNumberArray[0].value;
        } else if(props.name === 'In Progress') {
            maxCardNumber = maxCardNumberArray[1].value;
        } else {
            maxCardNumber = maxCardNumberArray[2].value;
        }
        if (maxCardNumber != null) {
            setMaxCards(maxCardNumber);
        }
    }

    function addTask() {
        var newTaskToAdd = getNewtaskToAdd();
        if (newTaskToAdd !== "") {
            resetAddTaskCard()
            addNewtask(newTaskToAdd)
        }
    }

    function getAddTaskCard() {
        return (
            <div className='card' >
                <textarea 
                    id='textArea' 
                    placeholder="Add new task!" 
                    className='textArea'
                    onKeyDown={(event)=>{
                        if (event.key === 'Enter') {
                            addTask();
                        }
                    }}
                >
                </textarea>
                <button 
                    className='saveButton' 
                    onClick={() => {
                        addTask();
                    }
                }> 
                Save task
                </button>
            </div>
        )
    }

    function checkIfMaxCardsReached() {
        if (taskArray.length >= maxCards) {
            return (
                <h1>Maximum card capacity reached!</h1>
            )
        } else {
            return (
                getAddTaskCard()
            )
        }
    }


    return(
        <div className="column">
            <div className='cardTitle'>
                <div className='columnTitle'>
                    {props.name}
                </div>
            </div>

            {taskArray.map((name, index)=>{
                return(
                    <Card 
                        name={name} 
                        id={index} 
                        deleteTask={deleteTask}
                    />)
            })}

            {checkIfMaxCardsReached()}

            <div className='maxNumCard'>
                Set maximum number of cards:  
                <input 
                    className='cardLimitSet' 
                    placeholder={maxCards} 
                    type='text'
                    onKeyDown={(event)=>{
                        if (event.key === 'Enter') {
                            userSetMaxCard();
                        }
                    }}
                >
                </input>
            </div>

            <div>
            <div className='maxNumCard'>
                Current number of tasks: {taskArray.length}
            </div>
            <div className='maxNumCard'>
                Current limit set: {maxCards}
            </div>
            </div>
        </div>
    )
}

export default Column;