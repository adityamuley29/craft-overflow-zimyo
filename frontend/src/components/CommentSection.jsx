import React, { useState } from 'react';

const CommentSection = ({ snippetId, comments, onAddComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddComment(snippetId, comment);
    setComment('');
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.content}</p>
            <small>By User {comment.user_id}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
