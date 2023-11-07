import { useRef, useState, Children, useEffect } from "react";
import { easeIn, easeOut } from "polished";
import { useBoolean } from "react-use";
import { createReducer } from "@reduxjs/toolkit";
import { MovieCard, MoviesQuantity, MovieTable, StatusAPI } from "./components";

// TODO: use https://giddy-beret-cod.cyclic.app/movieCompanies
const mockMovieCompanyData: any = [{ id: "1", name: "Test Productions" }];

// TODO: use https://giddy-beret-cod.cyclic.app/movies
const mockMovieData: any = [
  {
    id: "1",
    reviews: [6, 8, 3, 9, 8, 7, 8],
    title: "A Testing Film",
    filmCompanyId: "1",
    cost: 534,
    releaseYear: 2005,
  },
  {
    id: "2",
    reviews: [5, 7, 3, 4, 1, 6, 3],
    title: "Mock Test Film",
    filmCompanyId: "1",
    cost: 6234,
    releaseYear: 2006,
  },
];

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [statusAPI, setStatusAPI] = useState("loading");

  const [selectedMovie, setSelectedMovie] = useState(0);

  // const refreshButton = (buttonText: any) => {
  //   if (mockMovieCompanyData) {
  //     return <button>{buttonText}</button>;
  //   } else {
  //     return <p>No movies loaded yet</p>;
  //   }
  // };

  const getMovies = async () => {
    console.log("fun call getMovies ........ ");
    const url = "https://giddy-beret-cod.cyclic.app/movies";

    try {
      const response = await fetch(url);
      const resData = await response.json();
      console.log("All Movies ===> ", resData);
      setMovies(resData);
      setStatusAPI("success");
    } catch (err) {
      setStatusAPI("error");
    }
  };

  const getCompanies = async () => {
    console.log("fun call getCompanies ........ ");
    const url = "https://giddy-beret-cod.cyclic.app/movieCompanies";

    try {
      const response = await fetch(url);
      const resData = await response.json();
      console.log("All Companies ===> ", resData);
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
        <button onClick={refreshMovies}>Reload Movies</button>
      </div>
    </div>
  );
};
