import React, { useEffect, useState } from "react";
import axios from "axios";
import { DB_URL } from "../utils/constants";
import "./snippets.css";
import SnippetCard from "./SnippetCard";

const Snippets = ({ searchResult }) => {
  const [snippets, setSnippets] = useState(
    searchResult.length > 0 ? searchResult : []
  );

  const fetchSnippets = async () => {
    try {
      const { data, status } = await axios.get(`${DB_URL}/api/snippets`);
      if (status === 200) {
        setSnippets(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchResult.length > 0) {
      setSnippets(searchResult);
    } else {
      fetchSnippets();
    }
  }, [searchResult]);

  const handleSnippetUpvote = async (id) => {
    try {
      const res = await axios.post(`${DB_URL}/api/snippets/${id}/upvote`);
      if (res.status === 200) {
        fetchSnippets();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSnippetDownvote = async (id) => {
    try {
      const res = await axios.post(`${DB_URL}/api/snippets/${id}/downvote`);
      if (res.status === 200) {
        fetchSnippets();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSnippetDelete = async (id) => {
    try {
      const res = await axios.delete(`${DB_URL}/api/snippets/${id}`);
      if (res.status === 200) {
        fetchSnippets();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="snippets-container">
      <h1>
        {searchResult.length > 0 ? "Search result" : "All Snippet"} -{" "}
        {snippets.length}
      </h1>
      <div className="snippets">
        {snippets.map((snippet) => (
          <SnippetCard
            snippet={snippet}
            handleSnippetUpvote={handleSnippetUpvote}
            handleSnippetDownvote={handleSnippetDownvote}
            handleSnippetDelete={handleSnippetDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Snippets;
