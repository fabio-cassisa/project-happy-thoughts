import React, { useState, useEffect } from "react";
import { ThoughtList } from "../src/assets/components/ThoughtList";
import { ThoughtForm } from "../src/assets/components/ThoughtForm";
import "./App.css";

function App() {
  const [thoughts, setThoughts] = useState([]);
  const [uniqueLikes, setUniqueLikes] = useState(new Set()); // New state to track unique likes
  const [loading, setLoading] = useState(true);
  const apiUrl = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts";

  useEffect(() => {
    // Fetch recent thoughts when the component mounts
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setThoughts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching thoughts:", error));
  }, []);

  const onThoughtSubmit = (newThought) => {
    setThoughts([newThought, ...thoughts]);
  };

  const onLike = (thoughtId) => {
    setThoughts((prevThoughts) => {
      // Determine if the like is unique and update the uniqueLikes state
      const isUniqueLike = !uniqueLikes.has(thoughtId);
      if (isUniqueLike) {
        setUniqueLikes(new Set(uniqueLikes).add(thoughtId));
      }

      // Map through thoughts and update the one that was liked
      return prevThoughts.map((thought) =>
        thought._id === thoughtId
          ? { ...thought, hearts: thought.hearts + (isUniqueLike ? 1 : 0) }
          : thought
      );
    });
  };

  return (
    <div className="App">
      <h1>Happy Thoughts</h1>
      <div className="ThoughtForm">
        <ThoughtForm onThoughtSubmit={onThoughtSubmit} />
      </div>
      <h2 className="unique-likes-counter"> ❤️ = {uniqueLikes.size}</h2>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <ThoughtList thoughts={thoughts} onLike={onLike} />
      )}
    </div>
  );
}

export default App;
