import { Thought } from "./Thought";

export const ThoughtList = ({ thoughts, onLike }) => {
  return (
    <div>
      <h2>Recent Thoughts</h2>
      {thoughts.map((thought) => (
        <Thought key={thought._id} thought={thought} onLike={onLike} />
      ))}
    </div>
  );
};
