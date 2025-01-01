// src/components/GameCard.jsx

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardContainer = styled.div`
  background-color: rgba(42, 71, 94, 0.8);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const GameTitle = styled.h3`
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 10px;
`;

const GameDescription = styled.p`
  font-size: 14px;
  color: #c7d5e0;
  margin-bottom: 15px;
`;

const Tags = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 15px;
`;

const Tag = styled.span`
  background-color: #3498db;
  color: #fff;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const AddButton = styled.button`
  background: linear-gradient(45deg, #2ecc71, #28b54a);
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 7px 14px;
  font-weight: bold;
  cursor: pointer;
  font-size: 13px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(40, 181, 74, 0.4);
  }
`;

const RemoveButtonStyled = styled.button`
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 7px 14px;
  font-weight: bold;
  cursor: pointer;
  font-size: 13px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(196, 57, 43, 0.4);
  }
`;

const ViewButton = styled(Link)`
  background: linear-gradient(45deg, #2ecc71, #28b54a);
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 7px 14px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  font-size: 13px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(40, 181, 74, 0.4);
  }
`;

const GameCard = ({
  image,
  title,
  description,
  tags,
  buttonText,
  buttonLink,
  isFree,
  onAddToLibrary,
  onRemoveFromLibrary,
  onView,
  maxWidth,
  height
}) => {
  return (
    <CardContainer style={{ maxWidth, height }}>
      <GameImage src={image} alt={title} />
      <GameTitle>{title}</GameTitle>
      <GameDescription>{description}</GameDescription>
      <Tags>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
      <ButtonGroup>
        {isFree && onAddToLibrary && (
          <AddButton onClick={onAddToLibrary}>Add to Library</AddButton>
        )}
        {onRemoveFromLibrary && (
          <RemoveButtonStyled onClick={onRemoveFromLibrary}>Remove</RemoveButtonStyled>
        )}
        {onView && (
          <AddButton onClick={onView}>Details</AddButton>
        )}
      </ButtonGroup>
    </CardContainer>
  );
};

export default GameCard;
  