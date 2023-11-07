type MoviesQnty = {
  moviesQuantity: number;
};

const MoviesQuantity = (props: MoviesQnty) => {
  return (
    <div className="total-badge">
      <span>Total movies displayed : </span>
      <span>{props.moviesQuantity}</span>
    </div>
  );
};
export default MoviesQuantity;
