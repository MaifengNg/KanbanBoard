import {useEffect, useState} from 'react'
import "./Styles.css"
import Card from "./Card";

function Column(props) {
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
            
            <div className='card' >
                <textarea 
                    id='textArea' 
                    placeholder="Add new task!" 
                    className='textArea'
                >
                </textarea>
                <button 
                    className='saveButton' 
                    onClick={() => {
                        var newTaskToAdd = getNewtaskToAdd();
                        if (newTaskToAdd !== "") {
                            resetAddTaskCard()
                            addNewtask(newTaskToAdd)
                        }
                        
                    }
                }> 
                Save task
                </button>
            </div>
        </div>
    )
}

export default Column;