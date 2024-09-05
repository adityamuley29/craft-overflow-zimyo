import React, { useState } from "react";
import "./create-snippet-form.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DB_URL } from "../utils/constants";

const CreateSnippetForm = () => {
  const navigate = useNavigate();
  const [snippetFormData, setSnippetFormData] = useState({
    title: "",
    content: "",
    tags: "",
    language: "",
  });
  const [formError, setFormError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...snippetFormData,
      userId: localStorage.getItem("userId"),
    };

    try {
      const { data, status } = await axios.post(
        `${DB_URL}/api/snippets`,
        payload
      );

      if (status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setFormError(error.response.message);
    }
  };
  return (
    <div className="snippet-form-container">
      <h1 className="snippet-form-title">Create a Snippet</h1>
      <form className="snippet-form-grid">
        <div className="snippet-form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter a title"
            className="snippet-form-input"
            onChange={(e) =>
              setSnippetFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
        </div>
        <div className="snippet-form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Enter the content"
            className="snippet-form-textarea"
            onChange={(e) =>
              setSnippetFormData((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <div className="snippet-form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            placeholder="Enter tags separated by commas"
            className="snippet-form-input"
            onChange={(e) =>
              setSnippetFormData((prev) => ({
                ...prev,
                tags: e.target.value,
              }))
            }
          />
        </div>
        <div className="snippet-form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            className="snippet-form-select"
            onChange={(e) =>
              setSnippetFormData((prev) => ({
                ...prev,
                language: e.target.value,
              }))
            }
          >
            <option value="" disabled selected>
              Select a language
            </option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="ruby">Ruby</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
          </select>
        </div>
        {formError && <div className="form-error-container">{formError}</div>}

        <button
          type="submit"
          className="snippet-form-button"
          onClick={(e) => handleFormSubmit(e)}
        >
          Create Snippet
        </button>
      </form>
    </div>
  );
};

export default CreateSnippetForm;
