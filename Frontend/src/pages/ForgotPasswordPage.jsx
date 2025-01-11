import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!email) {
      setMessage("Please enter your email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("A password reset link has been sent to your email.");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error sending password reset:", error);
      setMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Body>
      <Form onSubmit={handleSubmit}>
        <Heading>Forgot Password</Heading>
        <InputContainer>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputContainer>
        {message && <Message>{message}</Message>}
        <Button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
        <Paragraph>
          Remembered your password?{" "}
          <SignInLink onClick={() => navigate("/sign-in")}>Log In</SignInLink>
        </Paragraph>
      </Form>
    </Body>
  );
};

export default ForgotPasswordPage;

// Styled-components
const Body = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #1b2838, #0f171e);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c7d5e0;
  font-family: "Roboto", sans-serif;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: rgba(27, 40, 56, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: rgb(199, 90, 246);
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin: 5px 0;
  border: 1px solid rgb(199, 90, 246);
  border-radius: 5px;
  background-color: #1e1e2e;
  color: rgb(255, 255, 255);
  font-size: 14px;
  box-sizing: border-box;

  ::placeholder {
    color: rgb(255, 255, 255);
  }

  &:focus {
    outline: none;
    border-color: rgb(199, 90, 246);
  }
`;

const Message = styled.p`
  font-size: 14px;
  color: rgb(199, 90, 246);
  margin-top: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  background-color: rgb(199, 90, 246);
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
  }

  &:disabled {
    background-color: rgb(199, 90, 246);
    cursor: not-allowed;
  }
`;

const Paragraph = styled.p`
  margin-top: 20px;
  font-size: 0.9rem;
  color: #c7d5e0;

  a {
    color: rgb(199, 90, 246);
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignInLink = styled.a`
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
