import React, { useState } from "react";
import styled from "styled-components";
import { Lock, User } from "lucide-react"; // Assuming you have lucide-react installed

// Styled-components for Login Page
const Body = styled.div`
  color: #fff;
  font-family: "Roboto", sans-serif;
  width: 100%;
  height: 100vh;
  background: url("img1.jpg") no-repeat center center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 400px;
  background: linear-gradient(#ffffff34, #ffffff27);
  backdrop-filter: blur(7px);
  border: 1px solid #ffffff83;
  box-shadow: 0 8px 32px #0000008a;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px 20px;
  border-radius: 15px;
`;

const Heading = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: bold;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%; /* Changed from 70% to 100% to utilize full form width */
  margin: 0 auto 15px;
  margin-bottom: ${(props) => (props.marginBottom ? "30px" : "15px")};
`;

const StyledInput = styled.input`
  width: 100%; /* Changed from 120% to 100% for proper alignment */
  padding: 15px 40px;
  margin: 0;
  height: 40px;
  outline: none;
  background-color: transparent;
  border: 1px solid #ffffffac;
  border-radius: 20px;
  color: #fff;
  font-size: 0.9rem;
  box-sizing: border-box;

  ::placeholder {
    color: #ffffffb9;
    font-size: 0.8rem;
    letter-spacing: 0.3px;
  }

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: #ffffffb9;
  pointer-events: none;
`;

const ErrorText = styled.p`
  color: #ff6b6b;
  font-size: 0.75rem;
  margin-top: 5px;
  margin-left: 10px;
`;

const CheckBoxContainer = styled.div`
  width: 100%;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  input {
    margin-right: 5px;
  }

  label {
    cursor: pointer;
    color:rgb(39, 115, 202); /* Added to match "Sign up" and "Forgot Password?" */
  }
`;

const Button = styled.button`
  width: 100%;
  height: 45px;
  outline: none;
  border: none;
  font-size: 0.9rem;
  border-radius: 30px;
  margin: 15px 0px;
  cursor: pointer;
  background: #4a90e2;
  color: #fff;
  transition: background 0.3s, transform 0.2s;

  &:hover {
    background: #357ab8;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const Paragraph = styled.p`
  font-size: 0.8rem;

  a {
    text-decoration: none;
    color: #4a90e2;
    font-weight: bold;
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LogInPage = () => {
  // State management for form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  // State management for errors
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // Form validation function
  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Example: Replace with your actual login API call
        const response = await fakeLoginAPI(formData);
        console.log("Login successful:", response);
        // Redirect or perform further actions upon successful login
      } catch (error) {
        console.error("Login failed:", error);
        // Handle login errors (e.g., display a global error message)
      }
    }
  };

  // Mock login API function (replace with real API call)
  const fakeLoginAPI = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.username === "admin" && data.password === "password") {
          resolve({ message: "Login successful" });
        } else {
          reject({ message: "Invalid credentials" });
        }
      }, 1000);
    });
  };

  return (
    <Body>
      <Form onSubmit={handleSubmit}>
        <Heading>Log In</Heading>

        {/* Username Input */}
        <InputContainer>
          <IconContainer>
            <User size={20} />
          </IconContainer>
          <StyledInput
            type="text"
            placeholder="Enter your username"
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          {errors.username && <ErrorText>{errors.username}</ErrorText>}
        </InputContainer>

        {/* Password Input */}
        <InputContainer marginBottom>
          <IconContainer>
            <Lock size={20} />
          </IconContainer>
          <StyledInput
            type="password"
            placeholder="Enter your password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <ErrorText>{errors.password}</ErrorText>}
        </InputContainer>

        {/* Remember Me & Forgot Password */}
        <CheckBoxContainer>
          <div>
            <input
              type="checkbox"
              id="remember"
              checked={formData.remember}
              onChange={(e) =>
                setFormData({ ...formData, remember: e.target.checked })
              }
            />
            <label htmlFor="remember">Remember me</label>
          </div>
        </CheckBoxContainer>

        {/* Sign In Button */}
        <Button type="submit">Sign In</Button>

        {/* Sign Up Link */}
        <Paragraph>
          Need an account?
          <a href="/sign-up">Sign up</a>
        </Paragraph>
      </Form>
    </Body>
  );
};

export default LogInPage;
