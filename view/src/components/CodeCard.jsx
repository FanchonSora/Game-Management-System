// src/components/CodeCard.jsx

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  max-width: 300px;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const CardTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const Tag = styled.span`
  background-color: #3498db;
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
`;

const CardButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ViewButton = styled(Link)`
  background-color: #0366d6;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease;
  
  &:hover {
    background-color: #0356b6;
  }
`;

const CodeCard = ({
  image,
  title,
  description,
  tags,
  buttonText,
  buttonLink,
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
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </CardTags>
        <CardButtons>
          <ViewButton to={buttonLink}>{buttonText}</ViewButton>
        </CardButtons>
      </CardContent>
    </CardContainer>
  );
};

export default CodeCard;
