import React, { useState } from "react";

function Test() {
    // 입력 필드의 상태를 관리하기 위한 useState 훅
    const [inputText, setInputText] = useState("");

    // 사용자가 입력 필드를 변경할 때마다 호출되는 함수
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    // 사용자가 데이터를 전송하려 할 때 호출되는 함수
    const handleSubmit = async () => {
        try {
            const response = await fetch('/analyzeEntities', {
                method: 'POST', // POST 요청
                headers: {
                    'Content-Type': 'text/plain', // 텍스트 형태의 데이터를 전송한다고 알림
                },
                body: inputText, // JSON으로 변환하는 대신 직접 텍스트를 전송
            });
            const data = await response.text(); // 서버로부터 받은 응답을 텍스트로 변환
            console.log(data); // 결과를 콘솔에 출력
        } catch (error) {
            console.error('Error:', error); // 오류 발생 시 콘솔에 오류 메시지 출력
        }
    };

    return (
        <body>
            <div>
                <input 
                    type='text' 
                    value={inputText} // 입력 필드의 값으로 inputText 상태 사용
                    onChange={handleInputChange} // 입력 필드가 변경될 때마다 handleInputChange 함수 호출
                />
                <button onClick={handleSubmit}>Send</button> {/* 클릭 시 handleSubmit 함수 호출 */}
            </div>
        </body>
    );
}

export default Test;
