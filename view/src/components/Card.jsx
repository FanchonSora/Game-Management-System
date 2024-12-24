// components/Card.jsx
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Styled Components for Card
const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: ${(props) => props.maxWidth || "300px"};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: ${(props) => props.height || "200px"};
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 15px;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  color: #0366d6;
  margin: 0 0 10px 0;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #586069;
  margin: 0 0 15px 0;
  height: ${(props) => props.height || "60px"};
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Tag = styled.span`
  background-color: #f1f8ff;
  color: #0366d6;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
`;

const CardButton = styled(Link)`
  display: inline-block;
  padding: 8px 16px;
  background-color: ${(props) => props.bgColor || "#28a745"};
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.3s ease, transform 0.2s;

  &:hover {
    background-color: ${(props) => props.hoverColor || "#218838"};
    transform: translateY(-2px);
  }
`;

const Card = ({
  image,
  title,
  description,
  tags,
  buttonText,
  buttonLink,
  bgColor,
  hoverColor,
  maxWidth,
  height,
}) => {
  return (
    <CardContainer maxWidth={maxWidth}>
      {image && <CardImage src={image} alt={title} height={height} />}
      <CardContent>
        <CardTitle>{title}</CardTitle>
        {description && (
          <CardDescription height={height}>{description}</CardDescription>
        )}
        {tags && (
          <CardTags>
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </CardTags>
        )}
        {buttonText && buttonLink && (
          <CardButton to={buttonLink} bgColor={bgColor} hoverColor={hoverColor}>
            {buttonText}
          </CardButton>
        )}
      </CardContent>
    </CardContainer>
  );
};

// PropTypes for type checking
Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  bgColor: PropTypes.string,
  hoverColor: PropTypes.string,
  maxWidth: PropTypes.string,
  height: PropTypes.string,
};

export default Card;
