import {useState, useCallback} from 'react'
import "./Styles.css"
import Card from "./Card";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import Backend from "react-dnd-html5-backend";

function Column(props) {

    // We set the variables for the number of cards in each column
    const [maxCards, setMaxCards] = useState(props.limit[props.limit.length-1]);

    // We use taskArray to store all the tasks given
    var [taskArray, setTaskArray] = useState(props.data)

    //idk why is it like this
    var [isFirst, setIsFirst] = useState(true);

    // We update the taskArray with the new task
    function addNewtask(newTask) {
        var newTaskArray;
        if (isFirst) {
            setIsFirst(false);
            newTaskArray = [...taskArray];
            setTaskArray(newTaskArray); 
        } else {
            newTaskArray = [...taskArray, newTask];
            setTaskArray(newTaskArray); 
        }
        
    }

    // We get the new task to add
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
        if (newTaskToAdd !== "") {
            props.updateData(props.name, newTaskToAdd);
        }
        return newTaskToAdd;
    }

    // we reset the card after adding new task
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

    // we delete a task from the taskArray
    function deleteTask(index) {
        let newTaskArray = [...taskArray];
        newTaskArray.splice(index, 1)
        props.deleteData(props.name, index);
        setTaskArray(newTaskArray);
        
    }

    // We let the user set the maximum number of cards
    // in the column
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
            props.limit.push(maxCardNumber)
        }
    }

    // we add task 
    function addTask() {
        var newTaskToAdd = getNewtaskToAdd();
        if (newTaskToAdd !== "") {
            resetAddTaskCard()
            addNewtask(newTaskToAdd)
        }
    }

    // we return the add task card
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

    // we use this function to return an add task card if
    // the limit has not been reach else
    // we do not allow them to add new task
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

    const moveTaskArray = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = taskArray[dragIndex]
            const hoverItem = taskArray[hoverIndex]
            // Swap places of dragItem and hoverItem in the taskArray
            setTaskArray(taskArray => {
                if (hoverItem !== undefined && dragItem !== undefined) {
                    const updatedTaskArray = [...taskArray]
                    updatedTaskArray[dragIndex] = hoverItem
                    updatedTaskArray[hoverIndex] = dragItem
                    props.updateArray(props.name, updatedTaskArray)
                    return updatedTaskArray
                } else {
                    return taskArray;
                }
            })
        },
        [taskArray],
    )

    return(
        <div className="column">
            <div className='cardTitle'>
                <div className='columnTitle'>
                    {props.name}
                </div>
            </div>
            {/* {taskArray.map((name, index)=>{
                return(
                    <Card 
                        name={name} 
                        id={index} 
                        deleteTask={deleteTask}   
                    />)
            })} */}
            <DndProvider backend={Backend}>
                {taskArray.map((name, index)=>{
                    return(
                        <Card 
                            name={name} 
                            id={index} 
                            deleteTask={deleteTask} 
                            moveTaskArray={moveTaskArray}  
                        />)
                })}
            </DndProvider>

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