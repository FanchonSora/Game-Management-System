// src/components/CodeCard.jsx

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled Components

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 300px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: #7f8c8d;
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
  flex-wrap: wrap;
`;

// Nút "View"
const ViewButton = styled(Link)`
  flex: 1;
  background-color: #0366d6;
  color: #fff;
  padding: 0.5rem 0;
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background-color: #0356b6;
  }
`;

// Nút "Add to Library"
const AddButton = styled.button`
  flex: 1;
  background-color: #28a745;
  color: #fff;
  padding: 0.5rem 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

// Nút "Remove from Library"
const RemoveButton = styled.button`
  flex: 1;
  background-color: #dc3545;
  color: #fff;
  padding: 0.5rem 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

// CodeCard Component
const CodeCard = ({
  image,
  title,
  description,
  tags,
  buttonText,
  buttonLink,
  isAdded,
  onAddToLibrary,
  onRemoveFromLibrary,
  maxWidth,
  height,
}) => {
  return (
    <CardContainer style={{ maxWidth: maxWidth || '300px', height: height || 'auto' }}>
      <CardImage src={image} alt={title} />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardTags>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </CardTags>
        <CardButtons>
          {/* Nút Thêm hoặc Xóa Dựa Trên Prop isAdded */}
          {isAdded ? (
            <RemoveButton onClick={onRemoveFromLibrary}>Remove</RemoveButton>
          ) : (
            <AddButton onClick={onAddToLibrary}>Add to Library</AddButton>
          )}
          {/* Nút "View" Luôn Luôn Hiển Thị */}
          <ViewButton to={buttonLink}>{buttonText}</ViewButton>
        </CardButtons>
      </CardContent>
    </CardContainer>
  );
};

export default CodeCard;
