import React from 'react';
import ChatBox from '../components/ChatBox';
import Navbar from '../components/Navbar';
import styled, { ThemeProvider } from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const SupportBotContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;

const SupportBot = () => {
  const { theme } = useTheme(); // Using context to access the current theme

  return (
    <SupportBotContainer>
      <Navbar />
      <Content>
        <h1>Support Bot</h1>
        <p>Interact with our Support Bot below:</p>
        <ChatBox />
      </Content>
    </SupportBotContainer>
  );
};

export default SupportBot;
