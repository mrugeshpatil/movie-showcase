import React, { useState } from "react";
import MovieCard from "./../MovieCard/MovieCard";
import { MovieCardProps } from "../../types/types";
import { MovieTableProps } from "../../types/types";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableSortLabel } from "@mui/material";

import { calculateAvergaeReviews } from "../../utils/calculateAverageReviews";

type Order = "asc" | "desc";
type CellId = string;
type SortDataProps = (a: object, b: object) => void;

const MovieTable = (props: MovieTableProps) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState("review");

  // add property average movie
  props.movies.map((movie) => {
    movie.averageReview = calculateAvergaeReviews(movie.reviews);
  });

  const sortDataBy = (data: any, byKey: string): SortDataProps => {
    console.log("====> sortDataBy by - ", byKey);
    let sortedData;
    // get average review
    if (byKey === "asc") {
      sortedData = data.sort(function (a: any, b: any) {
        return a.averageReview - b.averageReview;
      });
    }
    if (byKey === "desc") {
      sortedData = data.sort(function (a: any, b: any) {
        return b.averageReview - a.averageReview;
      });
    }
    return sortedData;
  };

  console.log("INIT order ===> ", order);

  const handleSortReview = (cellId: CellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
    sortDataBy(props.movies, order);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Movie Title</TableCell>
            <TableCell align="right" id="reviewScore">
              <TableSortLabel
                active={orderBy === "reviewScore"}
                direction={orderBy === "reviewScore" ? order : "asc"}
                onClick={() => handleSortReview("reviewScore")}
              >
                Average Review Score
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Company Name</TableCell>
            <TableCell align="right">Add Review</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.movies.map((movie: MovieCardProps) => {
            return (
              <MovieCard
                key={movie.title}
                title={movie.title}
                reviews={movie.reviews}
                name={movie.name}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default MovieTable;
