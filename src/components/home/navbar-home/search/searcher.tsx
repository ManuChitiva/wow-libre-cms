import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./style.css";

interface Props {
  onSearch: (query: string) => void;
  placeHolder: string;
}

const Searcher: React.FC<Props> = ({ onSearch, placeHolder }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-primary" onSubmit={handleSubmit}>
      <input
        className="search-input text-2xl font-serif"
        type="text"
        placeholder={placeHolder}
        value={query}
        onChange={handleChange}
      />
      <button type="submit" className="button">
        <FaSearch />
      </button>
    </form>
  );
};

export default Searcher;
