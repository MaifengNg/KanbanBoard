import "./Styles.css"
import React, { useRef } from "react";
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd'

function Card(props) {
    let cardId = props.id
    let index = [props.name, props.id, props.title];
    let name = props.name;


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
        drop: () => {return {targetIndex: cardId}},
        hover: (item, monitor) => {
            if (!ref.current) {
                return ;
            }

            const dragIndex = item.id
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            if (dragIndex === hoverIndex) {
                return;
            }

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY < hoverMiddleY) return

            // moveTaskArray(dragIndex, hoverIndex)
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
                        props.deleteTask(cardId);
                    }}
                > 
                Delete task
                </button>
                {isDragging}
            </div>
    )
}

export default Card;