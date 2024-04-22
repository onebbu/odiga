import React from 'react';
import styled from 'styled-components';
import './cPP.css';

// const DrawerContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
//   background-color: #f0f0f0;
//   overflow: hidden;
//   transition: height 0.3s ease-in-out;
// `;

const DrawerContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 1000;
    transition: transform 0.3s ease-in-out;
    transform: translateY(${props => (props.isOpen ? '0' : '-100%')});
`;

const DrawerContent = styled.div`
  padding: 20px;
`;
const steamGames = [
    'Counter-Strike: Global Offensive',
    'Dota 2',
    'Team Fortress 2',
    'PUBG',
    'Among Us',
    'Rocket League',
    'Apex Legends',
    'Fortnite',
  ];

const Drawer = ({ isOpen, onClose }) => {
  return (
    <DrawerContainer isOpen={isOpen}>
      <DrawerContent>
        <ul>
            {steamGames.map((game, index) => (
                <li key={index}>{game}</li>
            ))}
        </ul>
        <button className="buttondesign" onClick={onClose}>Close</button>
      </DrawerContent>
    </DrawerContainer>
  );
};

export default Drawer;
