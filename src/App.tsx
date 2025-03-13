import React, { useState, useEffect } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import { Container, Grid } from "./styles/LayoutStyles";
import Header from "./components/Header";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import SearchAndFilter from "./components/SearchAndFilter";
import MovieModal from "./components/MovieModal"; // Importação do modal

const ITEMS_PER_PAGE = 25;

interface Movie {
  name: string;
  date: number | null;
  score: number | null;
  posterPath: string;
  director: string;
  releaseDate: string | null;
  actors?: string[];
  duration?: number;
  imdbRating?: number;
  description?: string;
  opinion?: string;
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [yearFilter, setYearFilter] = useState("");
  const [watchedYearFilter, setWatchedYearFilter] = useState("");
  const [scoreFilter, setScoreFilter] = useState("");

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/movies?size=10000")
      .then((response) => response.json())
      .then((data) => {
        console.log("Filmes carregados:", data); 
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch((error) => console.error("Erro ao buscar filmes:", error));
  }, []);

  useEffect(() => {
    let result = movies.filter((movie) =>
      movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (yearFilter) {
      result = result.filter(
        (movie) =>
          movie.releaseDate &&
          movie.releaseDate.includes(yearFilter)
      );
    }
    if (watchedYearFilter) {
      result = result.filter(
        (movie) =>
          movie.date !== null &&
          movie.date.toString().includes(watchedYearFilter)
      );
    }
    if (scoreFilter) {
      result = result.filter(
        (movie) =>
          movie.score !== null &&
          movie.score.toFixed(1).startsWith(scoreFilter)
      );
    }

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
            valueA = a.score || 0;
            valueB = b.score || 0;
            break;
          case "name":
            valueA = a.name.toLowerCase();
            valueB = b.name.toLowerCase();
            break;
          default:
            return 0;
        }

        return sortOrder === "asc"
          ? valueA > valueB
            ? 1
            : -1
          : valueA < valueB
          ? 1
          : -1;
      });
    }

    setFilteredMovies(result);
    setCurrentPage(1);
  }, [searchQuery, filter, sortOrder, movies, yearFilter, watchedYearFilter, scoreFilter]);

  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
  const currentMovies = filteredMovies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleSaveOpinion = (opinion: string) => {
    if (selectedMovie) {
      setMovies((prevMovies) =>
        prevMovies.map((m) =>
          m.name === selectedMovie.name ? { ...m, opinion } : m
        )
      );
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const topElement = document.getElementById("topo");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
    <div id="topo"></div>
      <GlobalStyles />
      <Container>
        <Header />
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filter={filter}
          setFilter={setFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          totalMovies={filteredMovies.length}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          watchedYearFilter={watchedYearFilter}
          setWatchedYearFilter={setWatchedYearFilter}
          scoreFilter={scoreFilter}
          setScoreFilter={setScoreFilter}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <Grid>
          {currentMovies.map((movie, index) => (
            <Card key={index} movie={movie} onClick={() => openModal(movie)} />
          ))}
        </Grid>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Container>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSaveOpinion={handleSaveOpinion}
        />
      )}
    </>
  );
};

export default App;
