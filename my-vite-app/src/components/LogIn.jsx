import React from "react";
import "./LogInPage.css"; 

const LogInPage = () => {
  return (
    <form>
      <h1>Log In</h1>

      <div className="user1">
        <input
          type="text"
          className="txt"
          placeholder="Enter your username"
          id="username"
        />
        <i className="fa fa-user"></i>
      </div>

      <div className="user2">
        <input
          type="password"
          className="txt"
          placeholder="Enter your password"
          id="password"
        />
        <i className="fa fa-lock"></i>
      </div>

      <div className="mypw">
        <div>
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <a href="#">Forgot Password?</a>
      </div>

      <button type="submit">Sign In</button>

      <p>
        Need an account? <a href="#">Sign up</a>
      </p>
    </form>
  );
};

export default LogInPage;
