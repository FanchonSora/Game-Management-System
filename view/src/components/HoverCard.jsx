// src/components/HoverCard.jsx

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.4);
  }

  &:hover > div {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(42, 71, 94, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const ViewButton = styled.button`
  background-color: #ffffff;
  color: #2c3e50;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #bdc3c7;
  }
`;

const HoverCard = ({ image, title, gameId }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/market-game/${gameId}`);
  };

  return (
    <CardContainer>
      <Image src={image} alt={title} />
      <Overlay>
        <ViewButton onClick={handleView}>View</ViewButton>
      </Overlay>
    </CardContainer>
  );
};

export default HoverCard;
