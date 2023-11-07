
type MoviesQnty = {
    moviesQuantity: number
}

const MoviesQuantity = (props: MoviesQnty) => {
    return(
        <div>
            <span>Total movies displayed : </span>
            <span>{props.moviesQuantity}</span>
        </div>
    )
}
export default MoviesQuantity