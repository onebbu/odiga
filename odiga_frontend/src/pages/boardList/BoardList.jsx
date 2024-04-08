import React, {useEffect, useState} from 'react';
import axios from "axios";

const BoardList = () => {
    const [hello, setHello] = useState('');

    useEffect(() => {
        axios.get('/board')
            .then((res) => {
                setHello(res.data);
            })
    }, []);
    return (
        <div className="App">
            {/*백엔드 데이터 : {hello.level}*/}
        </div>
    );
};

export default BoardList;