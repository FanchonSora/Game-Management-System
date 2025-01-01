// File: src/components/CodeCard.jsx

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardContainer = styled.div`
  background: #292e49;
  border-radius: 10px;
  padding: 15px;
  color: #c7d5e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #c7d5e0;
  flex: 1;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const Tag = styled.span`
  background-color: #3498db;
  color: #fff;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
`;

const CardButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  justify-content: center;
`;

// Buttons
const PrimaryButton = styled.button`
  background-color: #66c0f4;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 8px 10px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.3s ease;

  &:hover {
    background-color: #5aa8e6;
  }
`;

const DangerButton = styled.button`
  background-color: #e74c3c;
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 8px 10px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const ViewLink = styled(Link)`
  background-color: #2ecc71;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 8px 10px;
  font-weight: bold;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: none;
  display: flex; 
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;

  &:hover {
    background-color: #28b54a;
  }
`;

const CodeCard = ({
  image,
  title,
  description,
  tags = [],
  buttonLink = "#",
  isAdded,
  onAddToLibrary,
  onRemoveFromLibrary,
}) => {
  return (
    <CardContainer>
      {image && <CardImage src={image} alt={title} />}
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      {tags.length > 0 && (
        <CardTags>
          {tags.map((tag, i) => (
            <Tag key={i}>{tag}</Tag>
          ))}
        </CardTags>
      )}
      <CardButtons>
        {isAdded ? (
          <DangerButton onClick={onRemoveFromLibrary}>Remove</DangerButton>
        ) : (
          <PrimaryButton onClick={onAddToLibrary}>Add</PrimaryButton>
        )}
        <ViewLink to={buttonLink}>View</ViewLink>
      </CardButtons>
    </CardContainer>
  );
};

export default CodeCard;
