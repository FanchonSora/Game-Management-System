import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Eye, EyeOff } from "lucide-react"; // Assuming lucide-react is installed

const LogInPage = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

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
        localStorage.setItem("username", username);
        navigate("/home");
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  // Update password state when user types
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Body>
      <Form onSubmit={handleLogIn}>
        <Heading>Sign In</Heading>

        <InputContainer>
          <Input
            type="text"
            placeholder="Enter your username"
            id="username"
            name="username"
            required
          />
        </InputContainer>

        <InputContainer>
          <Input
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter your password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {password && (
            passwordVisible ? (
              <EyeIcon onClick={togglePasswordVisibility} />
            ) : (
              <EyeOffIcon onClick={togglePasswordVisibility} />
            )
          )}
        </InputContainer>

        <CheckBoxContainer>
          <label>
            <input type="checkbox" id="remember" /> Remember me
          </label>
          <ForgotPasswordLink href="/forgot-password">
            Forgot password?
          </ForgotPasswordLink>
        </CheckBoxContainer>

        <Button type="submit">Sign In</Button>

        <Paragraph>
          Need an account?{" "}
          <SignUpLink onClick={() => navigate("/sign-up")}>
            Sign Up
          </SignUpLink>
        </Paragraph>
      </Form>
    </Body>
  );
};

export default LogInPage;

// Styled-components
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
  width: 400px;
  padding: 40px;
  background:  #2a2a3d;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 24px;
  color: rgb(199, 90, 246);
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

const EyeIcon = styled(Eye)`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: rgb(255, 255, 255);
  font-size: 1rem;
  cursor: pointer;
`;

const EyeOffIcon = styled(EyeOff)`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: rgb(255, 255, 255);
  font-size: 1rem;
  cursor: pointer;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  font-size: 14px;
  color: #c7d5e0;
`;

const ForgotPasswordLink = styled.a`
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
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
  font-size: 14px;
  margin-top: 20px;
  color: #a9a9a9;
`;

const SignUpLink = styled.a`
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    transform: translateY(-4px);
  }
`;
