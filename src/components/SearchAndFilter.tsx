import React from "react";
import styled from "styled-components";

const SearchFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 10px;
  padding: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  width: 250px;
  outline: none;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  background: #ff4500;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background: #e03c00;
  }
`;

const TotalMoviesText = styled.p`
  color: white;
  font-size: 1.2rem;
  margin-left: 10px;
`;

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  totalMovies: number;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
  totalMovies,
}) => {
  return (
    <SearchFilterWrapper>
      <Input
        type="text"
        placeholder="Buscar filme..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">Sem Filtro</option>
        <option value="releaseDate">Ano de Lançamento</option>
        <option value="watchedDate">Ano Assistido</option>
        <option value="score">Nota</option>
        <option value="name">Ordem Alfabética</option>
      </Select>

      <Button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
        {sortOrder === "asc" ? "🔼 Crescente" : "🔽 Decrescente"}
      </Button>

      <TotalMoviesText>🎬 Total de filmes: {totalMovies}</TotalMoviesText>
    </SearchFilterWrapper>
  );
};

export default SearchAndFilter;
