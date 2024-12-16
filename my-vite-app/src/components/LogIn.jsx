import React from "react";
import styled from "styled-components";

// Styled-components for Login Page
const Body = styled.div`
  color: #fff;
  font-family: "Roboto", sans-serif;
  width: 100%;
  height: 100vh;
  background: url("img1.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 330px;
  height: 360px;
  background: linear-gradient(#ffffff34, #ffffff27);
  backdrop-filter: blur(7px);
  border: 1px solid #ffffff83;
  box-shadow: 0 8px 32px #0000008a;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Heading = styled.h1`
  margin-bottom: 10px;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: ${(props) => (props.marginBottom ? "12px" : "0")};
`;

const Input = styled.input`
  width: 250px;
  height: 40px;
  outline: none;
  background-color: transparent;
  border: 1px solid #ffffffac;
  border-radius: 30px;
  margin-top: 20px;
  padding: 10px;
  color: #fff;

  ::placeholder {
    color: #ffffffb9;
    font-size: 0.8rem;
    letter-spacing: 0.3px;
  }
`;

const Icon = styled.i`
  position: absolute;
  top: 52%;
  right: 7%;
`;

const CheckBoxContainer = styled.div`
  width: 250px;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Button = styled.button`
  outline: none;
  border: none;
  font-size: 0.8rem;
  padding: 10px 105px;
  border-radius: 30px;
  margin: 15px 0px;
  cursor: pointer;
  background: #4a90e2;
  color: #fff;
`;

const Paragraph = styled.p`
  font-size: 0.8rem;

  a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
  }
`;

const LogInPage = () => {
  return (
    <Body>
      <Form>
        <Heading>Log In</Heading>

        <InputContainer>
          <Input
            type="text"
            placeholder="Enter your username"
            id="username"
          />
          <Icon className="fa fa-user"></Icon>
        </InputContainer>

        <InputContainer marginBottom>
          <Input
            type="password"
            placeholder="Enter your password"
            id="password"
          />
          <Icon className="fa fa-lock"></Icon>
        </InputContainer>

        <CheckBoxContainer>
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember"> Remember me </label>
          </div>
        </CheckBoxContainer>

        <Button type="submit">Sign In</Button>

        <Paragraph>
          Need an account? <a href="\sign-up">Sign up</a>
        </Paragraph>
      </Form>
    </Body>
  );
};

export default LogInPage;
