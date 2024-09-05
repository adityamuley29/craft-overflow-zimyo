import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Snippets from "../components/Snippets";
import { DB_URL } from "../utils/constants";
import axios from "axios";

const Home = () => {
  const [searchResult, setSearchResult] = useState([]);

  const onSearch = async (query) => {
    const res = await axios.post(`${DB_URL}/api/snippets/search`, {
      keyword: query,
    });
    if (res.status === 200) {
      setSearchResult(res.data.data);
    }
  };

  useEffect(() => {}, [onSearch]);
  return (
    <div>
      <SearchBar onSearch={onSearch} />

      <Snippets searchResult={searchResult} />
    </div>
  );
};

export default Home;
