import { useEffect, useState } from "react";

import { Button } from '../components/Button';
import { useMovies } from "../hooks/MovieContext";



import '../styles/sidebar.scss';


export function SideBar() {
  const {genres, selectedGenreId, handleClickButton} = useMovies();

  console.log(genres)

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={genre.id}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}