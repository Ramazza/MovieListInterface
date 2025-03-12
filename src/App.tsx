import React, { useState, useEffect } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import { Container, Grid } from "./styles/LayoutStyles";
import Header from "./components/Header";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import SearchAndFilter from "./components/SearchAndFilter";

const ITEMS_PER_PAGE = 25;

interface Movie {
  name: string;
  date: number;
  score: number;
  posterPath: string;
  director: string;
  releaseDate: string;
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string>(""); 
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetch("http://localhost:8080/api/movies?size=10000") 
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data); 
      })
      .catch((error) => console.error("Erro ao buscar filmes:", error));
  }, []);

  useEffect(() => {
 
    let result = movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filter) {
      result.sort((a, b) => {
        let valueA, valueB;

        switch (filter) {
          case "releaseDate":
            valueA = a.releaseDate || "9999";
            valueB = b.releaseDate || "9999";
            break;
          case "watchedDate":
            valueA = a.date || "9999";
            valueB = b.date || "9999";
            break;
          case "score":
            valueA = a.score;
            valueB = b.score;
            break;
          case "name":
            valueA = a.name.toLowerCase();
            valueB = b.name.toLowerCase();
            break;
          default:
            return 0;
        }

        if (sortOrder === "asc") {
          return valueA > valueB ? 1 : -1;
        } else {
          return valueA < valueB ? 1 : -1;
        }
      });
    }

    console.log("Filmes após ordenação:", result.length);

    setFilteredMovies(result);
    setCurrentPage(1); 

  }, [searchQuery, filter, sortOrder, movies]);

  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
  const currentMovies = filteredMovies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
  
      const element = document.getElementById("topo");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <GlobalStyles />
      <Container id="topo">
        <Header />
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={filter}
          setFilter={setFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          totalMovies={filteredMovies.length}
        />
        {filteredMovies.length === 0 ? (
          <p style={{ color: "white", textAlign: "center", fontSize: "1.2rem" }}>
            Nenhum filme encontrado.
          </p>
        ) : (
          <>
            <Grid>
              {currentMovies.map((movie, index) => (
                <Card key={index} movie={movie} />
              ))}
            </Grid>
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </>
        )}
      </Container>
    </>
  );
};

export default App;
