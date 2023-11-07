export type MovieCardProps = {
  title: string;
  reviews: [];
  name: string;
  averageReview?: number | string;
};

export type MovieTableProps = {
  movies: MovieCardProps[];
};
