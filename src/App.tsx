import { useState } from "react";
import { Content } from "./components/Content";
import { SideBar } from "./components/SideBar";
import { MoviesProvider } from "./hooks/MovieContext";

import './styles/global.scss';



export function App() {

  return (
    <MoviesProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>

        <Content />
        <SideBar />
      </div>

    </MoviesProvider>
  )
}