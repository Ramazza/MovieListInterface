import React from "react";
import styled from "styled-components";

const SearchFilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 10px;
  padding: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  width: 150px;
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
  yearFilter: string;
  setYearFilter: (year: string) => void;
  watchedYearFilter: string;
  setWatchedYearFilter: (year: string) => void;
  scoreFilter: string;
  setScoreFilter: (score: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
  totalMovies,
  yearFilter,
  setYearFilter,
  watchedYearFilter,
  setWatchedYearFilter,
  scoreFilter,
  setScoreFilter,
}) => {
  // Função para aceitar apenas números nos campos de ano
  const handleNumericInput = (value: string, setter: (val: string) => void) => {
    if (/^\d{0,4}$/.test(value)) {
      setter(value);
    }
  };

  // Função para permitir que "5" retorne "5.0", "5.1", etc.
  const handleScoreInput = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setScoreFilter(value);
    }
  };

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

      <Input
        type="text"
        placeholder="Ano lançamento"
        value={yearFilter}
        onChange={(e) => handleNumericInput(e.target.value, setYearFilter)}
      />

      <Input
        type="text"
        placeholder="Ano assistido"
        value={watchedYearFilter}
        onChange={(e) => handleNumericInput(e.target.value, setWatchedYearFilter)}
      />

      <Input
        type="text"
        placeholder="Nota"
        value={scoreFilter}
        onChange={(e) => handleScoreInput(e.target.value)}
      />

      <Button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
        {sortOrder === "asc" ? "🔼 Crescente" : "🔽 Decrescente"}
      </Button>

      <TotalMoviesText>🎬 Total de filmes: {totalMovies}</TotalMoviesText>
    </SearchFilterWrapper>
  );
};

export default SearchAndFilter;
