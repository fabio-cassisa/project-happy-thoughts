import React, { useState } from "react";
export const HeartButton = ({ thought, onLike }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const handleLike = () => {
    if (hasLiked) {
      console.log("You have already liked this thought.");
      return;
    }

    fetch(
      `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${thought._id}/like`,
      {
        method: "POST",
      }
    )
      .then(() => {
        onLike(thought._id);
        setHasLiked(true);
      })
      .catch((error) => console.error("Error liking thought:", error));
  };

  const heartClassName = `heart ${
    thought.hearts > 0 ? "heart-one-or-more" : ""
  } ${hasLiked ? "disabled" : ""}`;

  return (
    <div>
      <button
        className={heartClassName}
        onClick={handleLike}
        disabled={hasLiked} // Disable the button if the thought has been liked
      >
        ❤️
      </button>
      <span> x {thought.hearts}</span>
    </div>
  );
};
