import "./Styles.css"
import React, { useState, useCallback, useRef } from "react";
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd'

// function Card(props) {

//     return(
//         <div className='card'>
//             <h2 className='cardText'>
//                 {props.name}
//             </h2>
//             <button 
//                 className='deleteButton' 
//                 onClick={()=>{
//                     props.deleteTask(props.id);
//                 }}
//             > 
//             Delete task
//             </button>
//         </div>
//     )
// }

// export default Card;

function Card(props) {
    //https://medium.com/nmc-techblog/easy-drag-and-drop-in-react-22778b30ba37
    let index = props.id;
    let name = props.name;
    let moveTaskArray = props.moveTaskArray;

    // const [{ isDragging }, dragRef] = useDrag({
    //     type: 'card',
    //     item: { id, name },
    //     collect: (monitor) => ({
    //         isDragging: monitor.isDragging()
    //     })
    // })

    // useDrag - the list item is draggable
    const [{ isDragging }, dragRef] = useDrag({
        type: 'item',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    // useDrop - the list item is also a drop area
    const [spec, dropRef] = useDrop({
        accept: 'item',
        hover: (item, monitor) => {
            const dragIndex = item.id
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveTaskArray(dragIndex, hoverIndex)
            item.id = hoverIndex
        },
    })

    // Join the 2 refs together into one (both draggable and can be dropped on)
    const ref = useRef(null)
    const dragDropRef = dragRef(dropRef(ref))

    // Make items being dragged transparent, so it's easier to see where we drop them
    const opacity = isDragging ? 0 : 1

    return(
            <div className='card' ref={dragDropRef} style={{opacity}}>
                <h2 className='cardText'>
                    {name}
                </h2>
                <button 
                    className='deleteButton' 
                    onClick={()=>{
                        props.deleteTask(index);
                    }}
                > 
                Delete task
                </button>
                {isDragging}
            </div>
    )
}

export default Card;