import React, { useState } from "react";
import { MovieCardProps } from "../../types/types";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { calculateAvergaeReviews } from "../../utils";

const MovieCard = (props: MovieCardProps) => {
  const { title, reviews, name } = props;
  const [selected, setSelected] = useState("");
  const [exceedTextLimit, setExeedTextLimit] = useState(true);
  const [reviewText, setReviewText] = useState("");
  console.log("====> exceedTextLimit : ", exceedTextLimit);
  const addReview = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title: string
  ) => {
    selected === "" ? setSelected("selected") : setSelected("");
    // open Dialogue box to write a review for target movie
  };

  // submit target movie review
  const submitReview = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    exceedTextLimit
      ? console.log("---> Error exceed text can not submit")
      : console.log("Ready to submit review");
  };

  const validateTextLength = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let reviewTxt = event.target.value;
    let charLength = reviewTxt.length;
    setReviewText(reviewTxt);
    charLength > 10 ? setExeedTextLimit(false) : setExeedTextLimit(true);
  };

  return (
    <>
      <TableRow
        className={selected}
        key={title}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {title}
        </TableCell>
        <TableCell align="right">{calculateAvergaeReviews(reviews)} </TableCell>
        <TableCell align="right">{name}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            onClick={(event) => addReview(event, title)}
          >
            {selected === "" ? "Add Review" : "Close Review"}
          </Button>
        </TableCell>
        <TableCell>
          {selected === "selected" && (
            <div>
              <h3>Add your Review for {title}</h3>
              <div>
                <textarea
                  id="review"
                  name="review"
                  onChange={(event) => validateTextLength(event)}
                ></textarea>
              </div>
              {!exceedTextLimit ? (
                <div className="error-message">
                  Can't exceed more than 100 characters
                </div>
              ) : null}

              <Button
                variant="contained"
                onClick={(event) => submitReview(event)}
              >
                Submit Review
              </Button>
            </div>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};
export default MovieCard;
