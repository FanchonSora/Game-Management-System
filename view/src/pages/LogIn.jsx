import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Lock, User } from "lucide-react"; // Assuming you have lucide-react installed

const LogInPage = () => {
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const password = e.target.password.value;

    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <Body>
      <Form onSubmit={handleLogIn}>
        <Heading>Log In</Heading>

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
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            required
          />
          <Icon className="fa fa-lock" />
        </InputContainer>

        <CheckBoxContainer>
          <label>
            <input type="checkbox" id="remember" /> Remember me
          </label>
          <a href="/forgot-password" style={{ color: "#66c0f4" }}>
            Forgot password?
          </a>
        </CheckBoxContainer>

        <Button type="submit">Sign In</Button>

        <Paragraph>
          Need an account?{" "}
          <a onClick={() => navigate("/sign-up")} style={{ cursor: "pointer" }}>
            Sign Up
          </a>
        </Paragraph>
      </Form>
    </Body>
  );
};

// Styled-components for consistency with SignUpPage
const Body = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #1b2838, #0f171e);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c7d5e0;
  font-family: "Arial", sans-serif;
`;

const Form = styled.form`
  width: 400px;
  padding: 40px;
  background: rgba(27, 40, 56, 0.9);
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: #66c0f4;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin: 10px 0;
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
  color: #ffffffb9;
  font-size: 1rem;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  font-size: 14px;
  color: #c7d5e0;
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
  font-size: 14px;
  margin-top: 20px;
  color: #a9a9a9;

  a {
    color: #66c0f4;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: #4a90e2;
    }
  }
`;

export default LogInPage;
