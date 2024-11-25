import React from "react";

const SignInPage = () => {
  const styles = {
    container: {
      background: 'url("../assets/background.jpg") no-repeat center center fixed',
      backgroundSize: "cover",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
    },
    signInContainer: {
      background: "rgba(0, 0, 0, 0.8)",
      padding: "40px",
      borderRadius: "10px",
      width: "90%",
      maxWidth: "600px",
      color: "white",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    formSection: {
      width: "100%",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      marginBottom: "15px",
      padding: "10px",
      fontSize: "14px",
      background: "#1b2838",
      border: "1px solid #3c3f41",
      borderRadius: "5px",
      color: "#c7d5e0",
    },
    rememberMe: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    rememberLabel: {
      marginLeft: "5px",
      color: "#c7d5e0",
    },
    loginButton: {
      background: "linear-gradient(90deg, #4a90e2, #0074d9)",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      textAlign: "center",
    },
    loginButtonHover: {
      background: "linear-gradient(90deg, #0074d9, #4a90e2)",
    },
    helpLink: {
      display: "block",
      marginTop: "10px",
      color: "#66c0f4",
      textDecoration: "none",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.signInContainer}>
        <h1 style={styles.header}>Sign In</h1>
        <div style={styles.formSection}>
          <h3 style={{ color: "#66c0f4", marginBottom: "20px" }}>
            Sign in with your account
          </h3>
          <form style={styles.form}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              style={styles.input}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              style={styles.input}
            />
            <div style={styles.rememberMe}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" style={styles.rememberLabel}>
                Remember me
              </label>
            </div>
            <button type="submit" style={styles.loginButton}>
              Sign In
            </button>
          </form>
          <a href="#" style={styles.helpLink}>
            Help, I can't sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
