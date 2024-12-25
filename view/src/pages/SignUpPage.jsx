import React from "react";
import { useNavigate } from "react-router-dom"; // Ensure react-router-dom is installed
// If you're using Font Awesome via npm, ensure it's installed and imported
// Otherwise, include the CDN link in your public/index.html as shown later.

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

    // Example API call - replace with your actual endpoint
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
    <>
      <form onSubmit={handleSignUp}>
        <h1>Sign Up</h1>

        <div className="user1">
          <input
            type="text"
            className="txt"
            placeholder="Enter your username"
            id="username"
            name="username"
            required
          />
          <i className="fa fa-user"></i>
        </div>

        <div className="user1">
          <input
            type="email"
            className="txt"
            placeholder="Enter your email"
            id="email"
            name="email"
            required
          />
          <i className="fa fa-envelope"></i>
        </div>

        <div className="user2">
          <input
            type="password"
            className="txt"
            placeholder="Enter your password"
            id="password"
            name="password"
            required
          />
          <i className="fa fa-lock"></i>
        </div>

        <div className="user2">
          <input
            type="password"
            className="txt"
            placeholder="Confirm your password"
            id="confirmPassword"
            name="confirmPassword"
            required
          />
          <i className="fa fa-lock"></i>
        </div>

        <button type="submit">Sign Up</button>

        <p>
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/sign-in");
            }}
          >
            Log In
          </a>
        </p>
      </form>

      {/* Embedded CSS */}
      <style jsx="true">{`
        /* Resetting margins and paddings */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Body Styling */
        body {
          color: #fff;
          font-family: "Roboto", sans-serif;
          width: 100%;
          height: 100vh;
          background: url('img1.jpg') no-repeat center center fixed;
          background-size: cover;

          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Form Container */
        form {
          width: 330px;
          /* Adjusted height to accommodate additional fields */
          min-height: 500px;
          background: linear-gradient(#ffffff34, #ffffff27);
          backdrop-filter: blur(7px);
          border: 1px solid #ffffff83;
          box-shadow: 0 8px 32px #0000008a;

          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 20px;
          border-radius: 10px;
        }

        /* Form Heading */
        form h1 {
          margin-bottom: 20px;
          font-size: 1.8rem;
        }

        /* User Input Containers */
        .user1,
        .user2 {
          position: relative;
          width: 100%;
        }

        .user1 {
          margin-bottom: 15px;
        }

        .user2 {
          margin-bottom: 15px;
        }

        /* Input Fields */
        .txt {
          width: 100%;
          height: 40px;
          outline: none;
          background-color: transparent;
          border: 1px solid #ffffffac;
          border-radius: 30px;
          padding: 0 40px 0 15px; /* Adjusted padding for icons */
          font-size: 0.9rem;
          color: #fff;
        }

        /* Input Placeholder Styling */
        .txt::placeholder {
          color: #ffffffb9;
          font-size: 0.8rem;
          letter-spacing: 0.3px;
        }

        /* Icons for Input */
        .fa-user,
        .fa-envelope,
        .fa-lock {
          position: absolute;
          top: 50%;
          right: 15px;
          transform: translateY(-50%);
          color: #ffffffb9;
          font-size: 1rem;
        }

        /* Link Styling */
        a {
          text-decoration: none;
          color: #fff;
          font-weight: bold;
        }

        a:hover {
          color: #4a90e2;
        }

        /* Button Styling */
        button {
          outline: none;
          border: none;
          font-size: 0.9rem;
          padding: 10px 0;
          width: 100%;
          border-radius: 30px;
          margin: 20px 0;
          cursor: pointer;
          background: #4a90e2; /* You can adjust gradient if you'd like */
          color: #fff;
          transition: background 0.3s ease;
        }

        button:hover {
          background: #357ab8;
        }

        /* Paragraph Styling */
        p {
          font-size: 0.8rem;
        }

        /* Responsive Design (Optional) */
        @media (max-width: 400px) {
          form {
            width: 90%;
          }
        }
      `}</style>
    </>
  );
};

export default SignUpPage;
