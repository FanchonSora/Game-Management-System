import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root");

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 350px;
  background-color: #2a2c2b;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-out;
`;

const ChatHeader = styled.div`
  background-color: #4A154B; /* Slack-like purple */
  color: white;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Messages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #121212; /* Dark mode background */
`;

const Message = styled.div`
  background-color: ${props => props.isUser ? "#4f46e5" : "#333"};
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  margin: 5px;
  max-width: 80%;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const InputArea = styled.form`
  display: flex;
  padding: 10px;
  background-color: #333;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 20px;
  margin-right: 8px;
  font-size: 0.9rem;
  outline: none;
  background-color: #555; /* Slightly lighter than input area for contrast */
  color: #ddd; /* Light grey text color for visibility */
`;

const SendButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background-color: #665df5; /* Lighter purple on hover */
  }
`;

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);
  const handleUserInput = (e) => setUserInput(e.target.value);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newConversation = [...conversation, { isUser: true, text: userInput }];
    setConversation(newConversation);
    setUserInput("");

    // Dummy response from the bot
    setTimeout(() => {
      setConversation(prev => [...prev, { isUser: false, text: "Hello! How can I assist you today?" }]);
    }, 500);
  };

  return (
    <ChatContainer style={{ display: isOpen ? 'flex' : 'none' }}>
      <ChatHeader onClick={toggleChat}>Support Bot</ChatHeader>
      <Messages>
        {conversation.map((msg, index) => (
          <Message key={index} isUser={msg.isUser}>{msg.text}</Message>
        ))}
      </Messages>
      <InputArea onSubmit={handleSend}>
        <Input placeholder="Type your message..." value={userInput} onChange={handleUserInput} />
        <SendButton type="submit">➤</SendButton>
      </InputArea>
    </ChatContainer>
  );
};

export default ChatBox;
