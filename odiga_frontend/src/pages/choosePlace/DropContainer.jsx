import React, { useState, useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd'; // 오른쪽에서 왼쪽으로 drop만 하면 됨.
import update from 'immutability-helper';
import './cPP.css';
import { Box } from './Box.js';

// 왼쪽에 Drop할 Container 구현.
const DropContainer = ({ nickname, scheduleID, onSave }) => { //onSaveData 를 props로 받음
  const [boxes, setBoxes] = useState([]);
  
  const handleDrop = (item) => {
      const existingBox = boxes.find((box) => box.id === item.id);
      if (existingBox) {
        alert('같은 장소가 이미 존재합니다!');
        return;
      }

      if (boxes.length >= 5) {
        alert('하루에 5개의 일정까지 가능합니다.');
        return;
      }
      setBoxes((prevBoxes) => [...prevBoxes, item]);
    };

  const [{canDrop}, drop] = useDrop({
    accept: 'placeitem', //이거는 오른쪽 지역을 왼쪽 장바구니로 넘겨오는 Drag.
    canDrop: () => true,
    drop: (item) => { //item 에는 id, name, region 이 있다.
      handleDrop(item);
    },
    collect: monitor => ({
      canDrop: monitor.canDrop(),
    }),
  })
  
  const onRemoveAll = () => { //모두 비우기
    setBoxes([]);
  }

  const handleRemove = useCallback((targetId) => { // 선택한 Id의 box를 없앰.
      const newBoxes = boxes.filter((box) => box.id !== targetId);
      setBoxes(newBoxes);
    }, [boxes] );

  const moveBox = useCallback((dragIndex, hoverIndex) => {
    setBoxes((prevBoxes) =>
      update(prevBoxes, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevBoxes[dragIndex]],
        ],
      }),
    )
  }, [boxes])

  useEffect(() => {

    // const updatedData = boxes.map((data,index) => ({
    //   travelNum: index +1,
    //   contentId: data.id,
    //   name : data.name,
    //   address: data.region
    // }));

    // onSaveData(updatedData); // onSaveData 이벤트 핸들러 호출 전에 상태 업데이트
      console.log("boxes", boxes);
      console.log("Schedule ID:", scheduleID);
      // 리스트를 순회하면서 각 요소에서 필요한 정보를 추출하여 상태를 업데이트
      const updatedData = boxes.map((data, index) => ({
        courseDay: scheduleID,
        travelNum : index +1,
        contentId : data.id,
        name : data.name,
        address : data.region,
        nickname : nickname
      }));

      console.log("업데이트 데이터???????????????", updatedData);
      onSave(updatedData);

  }, [boxes, scheduleID]);

  const renderBoxes = () => {
    return boxes.map((box, index) => (
      <Box key={box.id} index={index} id={box.id} name={box.name} region={box.region} moveBox={moveBox} onRemove={handleRemove} />
    ));
  };

  return (
    <div className='container'>
        <div className={`${ boxes.length>0 ? 'after':''}`}>
            가고 싶은 여행지를 <br/> 드래그하여 채워보세요.
        </div> 
        <div className={` ${boxes.length>0 ? 'before':'after'}`} onClick={()=>onRemoveAll()}> 모두 비우기 </div>
          <div> {renderBoxes()}</div>
          <div className={`drop-area ${canDrop ? 'highlight': ''}`} ref={drop}>
            Drag here
        </div>
    </div>
  );
}


export default DropContainer;