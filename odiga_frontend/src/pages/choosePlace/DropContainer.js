import React, { useState, useCallback, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import update from 'immutability-helper';
import './cPP.css';
// import { Box } from './Box.js';



const DropContainer = () => {
  const [boxes, setBoxes] = useState([]);
  // const itemID = useRef(0);
  const [{canDrop, isOverCurrent}, drop] = useDrop({ 
    accept: 'placeitem', //이거는 오른쪽 지역을 왼쪽 장바구니로 넘겨오는 Drag.
    canDrop: () => true,
    drop: item => {
      if (isOverCurrent) {
        // let box = {id: itemID.current++ , name: item.name, region: item.region};
        setBoxes([...boxes, item]); //item 에는 name, region 이 있다.
      }
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })
  boxes.forEach(console.log)

  const onRemoveAll = (targetid) => { //모두 비우기
    setBoxes(boxes.filter((box) => box.index !== targetid));
  }
  
  function onRemove(targetidx) { // 개별 삭제가 안돼요.... ... 일단 후퇴..
    setBoxes(boxes.filter((box) => box.index !== targetidx));
  }
  const moveBox = useCallback((dragIndex, hoverIndex) => {
    setBoxes((prevBoxes) =>
      update(prevBoxes, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevBoxes[dragIndex]],
        ],
      }),
    )
  }, [])

  const renderBox = useCallback((box, index) => {
    return (
      <Box
        key={box.id}
        index={index}
        id={box.id}
        name={box.name}
        region={box.region}
        moveBox={moveBox}
        onRemove={onRemove}
      />
    )
  }, [])
  
  const Box = ({ id, name, region, index, moveBox }) => {
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
          <div>{index}, {name} | {region} </div> <div className='delete' onClick={()=>onRemove(index)}> X </div>
      </div>
    )
  }



  return (
    <div className='container'>
        <div className={`${ boxes.length>0 ? 'after':''}`}>
            가고 싶은 여행지를 <br/> 드래그하여 채워보세요.
        </div> 
        {/* {boxes.map(place => (
          <div className='placebox'>
            <div> {place.id}, {place.name} | {place.region} </div> <div className='delete' onClick={()=>onRemove(place.id)}> X </div>
          </div>
        ))} */}
        <div className={` ${boxes.length>0 ? 'before':'after'}`} onClick={()=>onRemoveAll()}> 모두 비우기 </div>
        <div>{boxes.map((box, i) => renderBox(box, i))} </div>
        <div className={`drop-area ${canDrop ? 'highlight': ''}`} ref={drop}>
            Drag here
        </div>
    </div>
  );
}



export default DropContainer;