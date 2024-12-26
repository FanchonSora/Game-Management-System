import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert("Sign up successful!");
        navigate("/sign-in");
      } else {
        const errorData = await response.json();
        alert(`Sign up failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <Body>
      <Form onSubmit={handleSignUp}>
        <Heading>Sign Up</Heading>

        <InputContainer>
          <Input
            type="text"
            placeholder="Enter your username"
            id="username"
            name="username"
            required
          />
          <Icon className="fa fa-user" />
        </InputContainer>

        <InputContainer>
          <Input
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            required
          />
          <Icon className="fa fa-envelope" />
        </InputContainer>

        <InputContainer>
          <Input
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            required
          />
          <Icon className="fa fa-lock" />
        </InputContainer>

        <InputContainer>
          <Input
            type="password"
            placeholder="Confirm your password"
            id="confirmPassword"
            name="confirmPassword"
            required
          />
          <Icon className="fa fa-lock" />
        </InputContainer>

        <Button type="submit">Sign Up</Button>

        <Paragraph>
          Already have an account?{" "}
          <a onClick={() => navigate("/sign-in")}>Log In</a>
        </Paragraph>
      </Form>
    </Body>
  );
};

// Styled Components
const Body = styled.div`
  color: #fff;
  font-family: "Roboto", sans-serif;
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #1b2838, #0f171e);
  display: flex;
  justify-content: center;
  align-items: center;
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
  color: #66c0f4;
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
  border: 1px solid #66c0f4;
  border-radius: 5px;
  background-color: #1b2838;
  color: #c7d5e0;
  font-size: 14px;
  box-sizing: border-box;

  ::placeholder {
    color: #a9a9a9;
  }

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

const Icon = styled.i`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  background-color: #4a90e2;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357ab8;
  }
`;

const Paragraph = styled.p`
  margin-top: 20px;
  font-size: 0.9rem;
  color: #c7d5e0;

  a {
    color: #4a90e2;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default SignUpPage;
