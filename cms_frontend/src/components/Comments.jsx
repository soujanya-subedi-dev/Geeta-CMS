// src/components/Comments.jsx
import { useState } from "react";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setComments([...comments, input]);
      setInput("");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded p-2 flex-1"
          placeholder="Write a comment..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Post
        </button>
      </form>
      <ul className="space-y-2">
        {comments.map((c, idx) => (
          <li key={idx} className="bg-gray-100 p-2 rounded">{c}</li>
        ))}
      </ul>
    </div>
  );
}
