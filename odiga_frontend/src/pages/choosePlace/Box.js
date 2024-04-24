import React, { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';


//얘는 왼쪽 container에서 서로 드래그해서 스와핑이 가능하도록 해주는 drag, drop이 구현되어있다.
export const Box = ({ id, name, region, index, moveBox, onRemove }) => {
    const refB = useRef(null)
    
    const [, drop] = useDrop({
      accept: 'box',
      
      hover(item, monitor) {
        if (!refB.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return
        }
        // Determine rectangle on screen
        const hoverBoundingRect = refB.current?.getBoundingClientRect()
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        const clientOffset = monitor.getClientOffset()
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        // Time to actually perform the action
        moveBox(dragIndex, hoverIndex)
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex
      },
    })
    const [{ isDragging }, drag] = useDrag({
      type: 'box',
      item: () => {
        return { id, index }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(refB))
    return (
      <div ref={refB} className={`placebox ${opacity ? '' : 'dragging'}`}>
          <div> {id}, {name} | {region} </div> <div className='delete' onClick={()=>onRemove(id)}> X </div>
      </div>
    )
  }