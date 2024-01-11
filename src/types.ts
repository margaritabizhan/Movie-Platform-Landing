export type Movie = {
  id: string,
  title: string,
  genres: string[],
}

export type Header = {
  'Authorization' : string,
}

export type GenreMap = {
  [key: string]: boolean;
}