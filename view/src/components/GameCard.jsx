// src/components/Card.jsx

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled Components
const CardContainer = styled.div`
  background-color: rgba(42, 71, 94, 0.8);
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  padding: 15px;
  position: relative;
  border: 1px solid #0f2b44;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: ${(props) => props.maxWidth || "250px"};
  height: ${(props) => props.height || "auto"};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const GameTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
`;

const GameDescription = styled.p`
  font-size: 14px;
  color: #ff4d6d;
  margin-bottom: 10px;
  font-weight: bold;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
`;

const Tag = styled.span`
  background-color: #2ecc71;
  color: #fff;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px; /* Tăng khoảng cách giữa nút và tags */
`;

const ViewButton = styled(Link)`
  background-color: #2ecc71;
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 8px 15px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(46, 204, 113, 0.5);
  font-size: 0.9rem; /* Giảm kích thước font */

  &:hover {
    background-color: #28b54a;
  }
`;

const AddButton = styled.button`
  background: linear-gradient(45deg, #66c0f4, #5aa8e6);
  border: none;
  border-radius: 5px;
  color: #fff;
  padding: 7px 14px; /* Giảm padding để nút nhỏ hơn */
  font-weight: bold;
  cursor: pointer;
  font-size: 0.8rem; /* Giảm kích thước font */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(86, 168, 230, 0.4);
  }
`;

const StyledLinkButton = styled.button` /* Thay đổi từ Link sang button để dễ dàng sử dụng onClick */
  background: linear-gradient(45deg, #2ecc71, #28b54a);
  border: none;
  border-radius: 5px;
  color: #000;
  padding: 7px 14px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.8rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(40, 181, 74, 0.4);
  }
`;

const Card = ({
  image,
  title,
  description,
  tags = [],
  buttonText,
  buttonLink,
  isFree,
  onAddToLibrary,
  onView, // Thêm prop onView
  maxWidth,
  height,
}) => {
  return (
    <CardContainer maxWidth={maxWidth} height={height}>
      <GameImage src={image} alt={title} />
      <GameTitle>{title}</GameTitle>
      <GameDescription>{description}</GameDescription>
      <TagsContainer>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagsContainer>
      <ButtonGroup>
        {isFree && <AddButton onClick={onAddToLibrary}>Add</AddButton>}
        <StyledLinkButton onClick={onView}>{buttonText}</StyledLinkButton>
      </ButtonGroup>
    </CardContainer>
  );
};

export default Card;