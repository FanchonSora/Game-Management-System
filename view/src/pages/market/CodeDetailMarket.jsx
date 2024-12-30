// src/pages/market/CodeDetailMarket.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import cpp from "react-syntax-highlighter/dist/esm/languages/hljs/cpp";
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import marketCodes from "../../data/marketCodes";
import Navbar from "../../components/Navbar"; // Import Navbar component

// Register languages for syntax highlighter
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("javascript", javascript);

// Keyframes for Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components

const Container = styled.div`
  font-family: "Roboto", sans-serif;
  background: linear-gradient(135deg, #182b3a 0%, #0d1c2e 100%);
  color: #c7d5e0;
  min-height: 100vh;
  padding: 80px 20px 20px 20px; /* Padding top để không che Navbar fixed */
  animation: ${fadeIn} 0.5s ease-out;
`;

// Code Detail Section
const CodeDetailContainer = styled.div`
  background-color: #1e2a38;
  border-radius: 12px;
  padding: 30px 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s ease-out;
  max-width: 1000px;
  margin: 0 auto;
  color: #fff;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CodeTitle = styled.h2`
  font-size: 28px;
  color: #66c0f4;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const DownloadButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 123, 255, 0.5);

  &:hover {
    background-color: #0056b3;
  }
`;

const AddButton = styled.button`
  padding: 12px 24px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
  box-shadow: 0 2px 5px rgba(40, 167, 69, 0.5);

  &:hover {
    background-color: #1e7e34;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

// Tags
const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  background-color: #2ecc71;
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

// Description
const Description = styled.p`
  font-size: 16px;
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 20px;
`;

// Code Block
const CodeBlock = styled.div`
  background-color: #16202c;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
`;

// Notification Styled Component
const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #28a745;
  color: #fff;
  padding: 15px 25px;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  animation: ${fadeIn} 0.3s ease-out, fadeOut 0.3s ease-out 2.5s forwards;
  opacity: 0;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

const CodeDetailMarket = () => {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();

  const [code, setCode] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState("");
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Tìm đoạn mã trong marketCodes.js
    const foundCode = marketCodes.find((item) => item.id === Number(id));
    if (foundCode) {
      setCode(foundCode);
      const languages = Object.keys(foundCode.codeSnippets);
      if (languages.length > 0) {
        setActiveLanguage(languages[0]);
      }
    } else {
      // Nếu không tìm thấy trong marketCodes.js, thông báo và quay lại Market
      alert("Không tìm thấy đoạn mã này trong Market. Đang chuyển hướng về Market.");
      navigate("/market-code");
    }
  }, [id, navigate]);

  const handleDownload = () => {
    if (code) {
      const snippet = code.codeSnippets[activeLanguage];
      const element = document.createElement("a");
      const file = new Blob([snippet], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      const extension =
        activeLanguage.toLowerCase() === "python"
          ? "py"
          : activeLanguage.toLowerCase() === "cpp"
          ? "cpp"
          : activeLanguage.toLowerCase() === "javascript"
          ? "js"
          : "txt";
      element.download = `${code.title.replace(/\s+/g, "_")}.${extension}`;
      document.body.appendChild(element); // Required for this to work in Firefox
      element.click();
      setNotification("Đoạn mã đã được tải xuống!");
      // Remove the element after download
      document.body.removeChild(element);
      // Hide notification after 3 seconds
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleAddToLibrary = () => {
    if (code && code.price === "Free") {
      const libraryCodes = JSON.parse(localStorage.getItem("libraryCodes")) || [];
      const exists = libraryCodes.find((item) => item.id === code.id);
      if (!exists) {
        const newCode = { ...code }; // Clone the code object
        delete newCode.price; // Optional: remove price field if not needed in library
        libraryCodes.push(newCode);
        localStorage.setItem("libraryCodes", JSON.stringify(libraryCodes));
        setNotification(`${code.title} đã được thêm vào thư viện của bạn!`);
      } else {
        setNotification(`${code.title} đã có trong thư viện của bạn.`);
      }
      // Hide notification after 3 seconds
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <Container>
      {/* Navbar */}
      <Navbar />

      {/* Code Detail Section */}
      {code && (
        <CodeDetailContainer>
          <CodeHeader>
            <CodeTitle>{code.title}</CodeTitle>
            <Buttons>
              <DownloadButton onClick={handleDownload}>Tải xuống</DownloadButton>
              {code.price === "Free" && (
                <AddButton onClick={handleAddToLibrary}>Thêm vào Thư Viện</AddButton>
              )}
              <AddButton onClick={() => navigate(-1)}>Quay lại</AddButton>
            </Buttons>
          </CodeHeader>

          {/* Tags */}
          <Tags>
            {code.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </Tags>

          {/* Description */}
          <Description>{code.description}</Description>

          {/* Code Snippet */}
          <CodeBlock>
            <SyntaxHighlighter
              language={
                activeLanguage.toLowerCase() === "python"
                  ? "python"
                  : activeLanguage.toLowerCase() === "cpp"
                  ? "cpp"
                  : activeLanguage.toLowerCase() === "javascript"
                  ? "javascript"
                  : "text"
              }
              style={github}
              showLineNumbers
            >
              {code.codeSnippets[activeLanguage]}
            </SyntaxHighlighter>
          </CodeBlock>

          {/* Notification */}
          {notification && <Notification>{notification}</Notification>}
        </CodeDetailContainer>
      )}
    </Container>
  );
};

export default CodeDetailMarket;
