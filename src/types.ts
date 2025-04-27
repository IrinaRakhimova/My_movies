export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: any;
  rating: number;
  vote_average?: number;
  isLiked?: boolean;
}
