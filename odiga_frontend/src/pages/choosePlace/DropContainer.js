import React, { useState,useCallback } from 'react';
import { useDrop } from 'react-dnd';
import './cPP.css';

const DropContainer = () => {
  const [boxes, setBoxes] = useState([]);
  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    accept: 'placeitem',
    canDrop: () => true,
    drop: item => {
      if (isOverCurrent) {
        setBoxes([...boxes, item]);
      }
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });
  const handleFilterFile = useCallback(() => {
    // 매개변수로 받은 id와 일치하지 않는지에 따라서 filter 해줍니다.
    // setBoxes(boxes.filter((file: ISelectFile) => file.id !== id));

    
    alert("아직 삭제 구현 못함.....");
  });
  return (
    <div className='container'>
      {boxes.map(place => (
          <div className='placebox'>
            <div> {place.name} | {place.region} </div> <div style={{border:'solid 1px', color:'red'}} onClick={()=>handleFilterFile()}> X </div>
          </div>
      ))}
      <div className={`drop-area ${canDrop ? 'highlight': ''}`} ref={drop}>
        Drag here
      </div>
    </div>
  );
}

export default DropContainer;
