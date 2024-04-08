import React from 'react';
import './App.css';
import Container from "react-bootstrap/Container";
import BoardList from "./components/BoardList";

function App() {
    return (
        <Container className="p-3">
            <BoardList></BoardList>
        </Container>
    );
}

export default App;