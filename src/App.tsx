import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { MoviesQuantity, MovieTable, StatusAPI } from "./components";

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [statusAPI, setStatusAPI] = useState("loading");

  const getMovies = async () => {
    const url = "https://giddy-beret-cod.cyclic.app/movies";

    try {
      const response = await fetch(url);
      const resData = await response.json();
      setMovies(resData);
      setStatusAPI("success");
    } catch (err) {
      setStatusAPI("error");
    }
  };

  const getCompanies = async () => {
    const url = "https://giddy-beret-cod.cyclic.app/movieCompanies";

    try {
      const response = await fetch(url);
      const resData = await response.json();
      setCompanies(resData);
      setStatusAPI("success");
    } catch (err) {
      setStatusAPI("error");
    }
  };

  const refreshMovies = () => {
    getMovies();
    getCompanies();
  };

  useEffect(() => {
    getMovies();
    getCompanies();
  }, []);

  // merge company object property with movies object
  // to get the company name within same moview object
  movies.map((movie, index) => {
    Object.assign(movie, companies[index]);
  });

  return (
    <div>
      <h2>Welcome to Movie database - Optix Movie Gallery!</h2>
      <MoviesQuantity moviesQuantity={movies.length} />
      <MovieTable movies={movies} />
      <div>
        <StatusAPI status={statusAPI} />
      </div>
      <div>
        <Button variant="contained" onClick={refreshMovies}>
          Reload Movies
        </Button>
      </div>
    </div>
  );
};
