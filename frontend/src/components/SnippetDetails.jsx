import React, { useEffect, useState } from "react";
import "./snippet-details.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { DB_URL } from "../utils/constants";

const SnippetDetails = () => {
  const { id } = useParams();
  const { state } = useNavigate();

  const [snippet, setSnippet] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      const payload = {
        snippetId: Number(id),
        userId: Number(localStorage.getItem("userId")),
        content: newComment,
      };

      try {
        const { data, status } = await axios.post(
          `${DB_URL}/api/comments`,
          payload
        );
        if (status === 201) {
          fetchSnippetData();
        }
      } catch (error) {
        console.log(error);
      }
      setNewComment("");
    }
  };

  const fetchSnippetDataById = async (id) => {
    try {
      const { data, status } = await axios.get(`${DB_URL}/api/snippets/${id}`);
      if (status === 200) {
        setSnippet(data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCommentsDataBySnippetId = async (id) => {
    try {
      const { data, status } = await axios.get(`${DB_URL}/api/comments/${id}`);

      if (status === 200) {
        setComments(data?.comments?.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSnippetData = async () => {
    fetchSnippetDataById(id);
    fetchCommentsDataBySnippetId(id);
  };

  useEffect(() => {
    fetchSnippetData();
  }, [id, newComment]);

  return (
    <div className="snippet-container">
      <div className="snippet-content-section">
        <h1 className="snippet-title">{snippet?.title}</h1>
        <p className="snippet-content">{snippet?.content}</p>
        <div className="snippet-tags">
          {snippet?.tags &&
            snippet?.tags
              .split(" ")
              .map((tag) => <span className="snippet-tag">{tag}</span>)}
        </div>
      </div>
      <div className="comment-section">
        <div className="comment-group">
          <label htmlFor="comment">Add a comment</label>
          <div className="comment-input-group">
            <textarea
              id="comment"
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button onClick={handleSubmitComment} className="comment-button">
              Submit
            </button>
          </div>
        </div>
        <div className="comment-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="40"
                height="40"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="black"
                  stroke-width="2"
                  fill="none"
                />
                <circle cx="12" cy="9" r="3" fill="black" />
                <path
                  d="M12 14c-3.3 0-6 1.7-6 4v2h12v-2c0-2.3-2.7-4-6-4z"
                  fill="black"
                />
              </svg>

              <div className="comment-content">
                <div className="comment-author">Anonymous</div>
                <div className="comment-text">{comment.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnippetDetails;
