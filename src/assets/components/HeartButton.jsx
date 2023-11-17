export const HeartButton = ({ thought, onLike }) => {
  const handleLike = () => {
    fetch(
      `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${thought._id}/like`,
      {
        method: "POST",
      }
    )
      .then(() => {
        onLike(thought._id);
      })
      .catch((error) => console.error("Error liking thought:", error));
  };

  const heartClassName = `heart ${
    thought.hearts > 0 ? "heart-one-or-more" : ""
  }`;

  return (
    <div>
      <button className={heartClassName} onClick={handleLike}>
        ❤️
      </button>
      <span> x {thought.hearts}</span>
    </div>
  );
};
