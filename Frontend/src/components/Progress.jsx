// src/components/ui/Progress.jsx

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Styled Progress Container
const ProgressContainer = styled.div`
  height: 8px;
  background-color: ${(props) => props.bgColor || "#2a475e"};
  border-radius: 4px;
  overflow: hidden;
`;

// Styled Progress Bar
const ProgressBar = styled.div`
  height: 100%;
  background-color: ${(props) => props.barColor || "#c7d5e0"};
  width: ${(props) => props.value}%;
  transition: width 0.3s ease;
`;

const Progress = ({ value, bgColor, barColor }) => {
  const clampedValue = Math.max(0, Math.min(100, value));
  return (
    <ProgressContainer bgColor={bgColor}>
      <ProgressBar value={clampedValue} barColor={barColor} />
    </ProgressContainer>
  );
};

Progress.propTypes = {
  value: PropTypes.number.isRequired,
  bgColor: PropTypes.string,
  barColor: PropTypes.string,
};

export default Progress;
