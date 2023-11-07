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
  const [reviewResponse, setReviewResponse] = useState(null);
  const [reviewResponseError, setReviewResponseError] = useState("");

  const addReview = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title: string
  ) => {
    selected === "" ? setSelected("selected") : setSelected("");
  };

  const sendReview = async () => {
    const url = "https://giddy-beret-cod.cyclic.app/submitReview";
    // check if review text input is not empty
    if (reviewText.length === 0) {
      setReviewResponseError("Review should not be empty");
      setReviewText("");
      return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          review: reviewText,
        }),
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      });
      const resData = await response.json();
      setReviewText("");
      setReviewResponseError("");
      setReviewResponse(resData.message);
      //clear review text input
    } catch (err) {
      setReviewResponseError("Error submitting review try again...");
    }
  };

  const validateTextLength = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let reviewTxt = event.target.value;
    let charLength = reviewTxt.length;
    setReviewText(reviewTxt);
    charLength > 100 ? setExeedTextLimit(false) : setExeedTextLimit(true);
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
                  rows={4}
                  cols={50}
                  onChange={(event) => validateTextLength(event)}
                ></textarea>
              </div>
              {!exceedTextLimit ? (
                <div className="error-message">
                  Can't exceed more than 100 characters
                </div>
              ) : null}
              <Button variant="contained" onClick={sendReview}>
                Submit Review
              </Button>
              <div>
                {reviewResponse && (
                  <h4 className="success-message">{reviewResponse}</h4>
                )}
                {reviewResponseError && (
                  <h4 className="error-message">{reviewResponseError}</h4>
                )}
              </div>
            </div>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};
export default MovieCard;
