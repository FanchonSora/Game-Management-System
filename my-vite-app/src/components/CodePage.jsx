import React from "react";
import { useParams, Link } from "react-router-dom";

const CodePage = () => {
  const { id } = useParams();
  const repositories = {
    1: { name: "Game-Management-System", description: "A system to manage games.", language: "JavaScript", lastUpdated: "6 hours ago" },
    2: { name: "Matrix-Calculator-Web", description: "A web app for matrix calculations.", language: "HTML", lastUpdated: "yesterday" },
    3: { name: "Basic-Chat-Box", description: "A chat application in Python.", language: "Python", lastUpdated: "Sep 9" },
    4: { name: "Object-Detection-Game", description: "A game with object detection.", language: "Python", lastUpdated: "Sep 9" },
    5: { name: "Event-Management", description: "A TypeScript-based event management app.", language: "TypeScript", lastUpdated: "Aug 30" },
  };

  const repo = repositories[id];

  if (!repo) {
    return <div>Repository not found</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{repo.name}</h1>
        <p style={styles.language}>Language: {repo.language}</p>
        <p style={styles.updated}>Last Updated: {repo.lastUpdated}</p>
        <p style={styles.description}>{repo.description}</p>
        <Link to="/library-code" style={styles.backButton}>Back to Library</Link>
      </div>
    </div>
  );
};

export default CodePage;

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f6f8fa",
    color: "#24292e",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  language: {
    fontSize: "16px",
    color: "#0366d6",
  },
  updated: {
    fontSize: "14px",
    color: "#57606a",
  },
  description: {
    marginTop: "20px",
    fontSize: "16px",
  },
  backButton: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 15px",
    backgroundColor: "#2ea44f",
    color: "#fff",
    borderRadius: "6px",
    textDecoration: "none",
  },
};
