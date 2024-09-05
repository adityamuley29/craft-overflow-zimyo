import React, { useEffect, useState } from "react";
import "./search-bar.css";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  useEffect(() => {
    if (!query) {
      onSearch(query);
    }
  }, [query]);

  return (
    <form onSubmit={handleSubmit} className="searchBar-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search snippets..."
        className="searchbar"
      />
      <button type="submit" className="search-btn">
        Search
      </button>
      <button
        type="submit"
        className="create-snippet-btn"
        onClick={() => navigate("/snippet/create")}
      >
        Create Snippet
      </button>
    </form>
  );
};

export default SearchBar;
