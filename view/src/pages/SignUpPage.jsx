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
      const response = await fetch("http://127.0.0.1:8000/api/signup", {
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
        alert(`Sign up failed: ${errorData.detail}`);
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
          <a onClick={() => navigate("/sign-in")}>Sign In</a>
        </Paragraph>
      </Form>
    </Body>
  );
};

export default SignUpPage;

// Styled Components
const Body = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #2a2a3d, #0f171e);
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
  background: #2a2a3d;
  backdrop-filter: blur(10px);
  border-radius: 15px;
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
  margin: 10px 0;
  border: 1px solid rgb(199, 90, 246);
  border-radius: 5px;
  background-color: #1e1e2e;
  color:rgb(255, 255, 255);
  font-size: 14px;
  box-sizing: border-box;

  ::placeholder {
    color:rgb(255, 255, 255);
  }

  &:focus {
    outline: none;
    border-color: rgb(199, 90, 246);
  }
`;

const Icon = styled.i`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: rgb(255, 255, 255);
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  background-color:rgb(199, 90, 246);
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color:rgb(184, 81, 228);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgb(162, 68, 202);
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
     transform: translateY(-4px);
    }
  }
`;
