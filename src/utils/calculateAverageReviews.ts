type ReviewProps = []

export const calculateAvergaeReviews = (reviews: ReviewProps) => {
    let average = reviews.reduce((acc,review) => {
        return acc + review/ reviews.length;
    },0);
    return average > 0 ? average.toFixed(1) : 0;
}
