import React from "react";
import "./snippet-card.css";
import { useNavigate } from "react-router-dom";

const SnippetCard = ({
  snippet,
  handleSnippetUpvote,
  handleSnippetDownvote,
  handleSnippetDelete,
}) => {
  const navigate = useNavigate();
  return (
    <div class="card" key={snippet.id}>
      <div class="card-header">
        <h3
          class="card-title"
          onClick={() => navigate(`/snippet/${snippet.id}`)}
        >
          {snippet.title}
        </h3>
        <div class="card-actions">
          <button
            class="card-button card-button-up"
            onClick={() => handleSnippetUpvote(snippet.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon"
            >
              <path d="m5 12 7-7 7 7"></path>
              <path d="M12 19V5"></path>
            </svg>
          </button>
          <span class="card-count">{snippet.upvotes - snippet.downvotes}</span>
          <button
            class="card-button card-button-down"
            onClick={() => handleSnippetDownvote(snippet.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon"
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </button>
          <button
            class="card-button card-button-down"
            onClick={() => handleSnippetDelete(snippet.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
      <div class="card-description">{snippet.content}</div>
      <div class="card-tags">
        {snippet.tags.split(" ").map((tag) => (
          <div class="card-tag">{tag}</div>
        ))}
      </div>
    </div>
  );
};

export default SnippetCard;
