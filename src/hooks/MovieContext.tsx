import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { ReactNode } from "react";
import { api } from "../services/api";

interface GenreProps {
  id: number,
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family',
  title: string
}

interface MovieProps {
  imdbID: string;
  Title: string,
  Poster: string,
  Ratings: [{
    Source: string,
    Value: string
  }],
  Runtime: string;
}

interface MoviesProviderProps {
  children: ReactNode;
}

interface MoviesContextData {
  genres: GenreProps[];
  selectedGenre: GenreProps;
  selectedGenreId: number;
  movies: MovieProps[];
  handleClickButton: (id: number) => void;
}

const MoviesContext = createContext<MoviesContextData>({} as MoviesContextData)

export function MoviesProvider({children}: MoviesProviderProps) {
  const [genres, setGenres] = useState<GenreProps[]>([]) 
  const [selectedGenreId, setSelectedGenreId] = useState(1)
  
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [selectedGenre, setSelectedGenre] = useState<GenreProps>({} as GenreProps)

  useEffect(() => {
    api.get<GenreProps[]>('genres').then(response => {
      setGenres(response.data)
    })
  },[])

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id)
  }


  return (
    <MoviesContext.Provider value={{genres, selectedGenreId, selectedGenre, handleClickButton, movies}}>
      {children}
    </MoviesContext.Provider>
  )
}

export function useMovies() {
  const context = useContext(MoviesContext);

  return context
}