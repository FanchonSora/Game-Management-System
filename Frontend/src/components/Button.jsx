// src/components/ui/Button.jsx

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Styled Button Component
const StyledButton = styled.button`
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Variants */
  background-color: ${(props) =>
    props.variant === "outline" ? "transparent" : props.bgColor || "#28a745"};
  color: ${(props) =>
    props.variant === "outline" ? "#586069" : props.textColor || "#fff"};
  border: ${(props) =>
    props.variant === "outline" ? `2px solid ${props.borderColor || "#586069"}` : "none"};

  &:hover {
    background-color: ${(props) =>
      props.variant === "outline"
        ? props.hoverBgColor || "#586069"
        : props.hoverBgColor || "#218838"};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  /* Additional Custom Classes */
  ${(props) => props.className || ""}
`;

const Button = ({
  children,
  variant = "default",
  bgColor,
  hoverBgColor,
  textColor,
  borderColor,
  className,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      bgColor={bgColor}
      hoverBgColor={hoverBgColor}
      textColor={textColor}
      borderColor={borderColor}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "outline"]),
  bgColor: PropTypes.string,
  hoverBgColor: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
