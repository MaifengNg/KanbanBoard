import {useState} from 'react'
import "./Styles.css"
import Card from "./Card";

function Column(props) {
    var dataArray = props.data;
    const [test, setTest] = useState([])

    // for (var i = 0; i < dataArray.length; i++) {
    //     const name = dataArray[i].name
    //     test.push(
    //         <Card name={name}/>
    //     )
    // }

    function addNewtask(newTask) {
        var tempArray = test.slice(0, test.length)
        tempArray.push(
            <Card name={newTask}/>
        )
        setTest(tempArray)
    }

    return(
        <div className="column">
            <h1 >
                {props.name}
            </h1>
            <div>
                {test}
            </div>
            <div className = 'card' >
                <textarea 
                    id='textArea' 
                    placeholder="Add new task!" 
                    className='textArea'
                >
                </textarea>
                <button 
                    className='saveButton' 
                    onClick={() => {
                        const newTaskToAdd = document.getElementById("textArea").value;
                        document.getElementById("textArea").value=null;
                        addNewtask(newTaskToAdd)
                    }
                }> 
                Save task
                </button>
            </div>
        </div>
    )
}

export default Column;