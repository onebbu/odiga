import React, { useState, useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import './cPP.css';

const DropContainer = () => {
  const [boxes, setBoxes] = useState([]);
  const itemID = useRef(0);
  
  //id: itemID.current++  요놈이 안돼 요놈이...
  const [{canDrop, isOverCurrent}, drop] = useDrop({
    accept: 'placeitem',
    canDrop: () => true,
    drop: item => {
      if (isOverCurrent) {
        let box = {id: itemID.current++ , name: item.name, region: item.region};
        setBoxes([...boxes, box]);
      }
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
    
  });
//   const handleFilterFile = useCallback(()  => {
//     // 매개변수로 받은 id와 일치하지 않는지에 따라서 filter 해줍니다.
//     setBoxes(boxes.filter((box) => box.id !== place.id));
//     // setBoxes(boxes.filter((file: ISelectFile) => file.id !== id));
//     // alert("아직 삭제 구현 못함.....");
//   });
  const onRemove = (targetId) => {
    setBoxes(boxes.filter((box) => box.id !== targetId));
  }
  return (
    <div className='container'>
        <div className={`${ boxes.length>0 ? 'after':''}`}>
            가고 싶은 여행지를 드래그하여 채워보세요.
        </div> 
        {boxes.map(place => (
          <div className='placebox'>
            <div> {place.id}, {place.name} | {place.region} </div> <div className='delete' onClick={()=>onRemove(place.id)}> X </div>
          </div>
        ))}
        <div className={`drop-area ${canDrop ? 'highlight': ''}`} ref={drop}>
            Drag here
        </div>
    </div>
  );
}

export default DropContainer;