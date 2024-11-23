import React, { useEffect, useState } from "react";
import Cards from "../card/card";
import "./movieList.css";
import { useParams } from "react-router-dom";



const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    const getData = () => {
      fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => setMovieList(data.results))
        .catch((error) =>
          console.error("There was a problem with the fetch operation:", error)
        );
    };

    getData();
  }, [type]);

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list__cards">
        {
            movieList.map((movie) => (
              <Cards key={movie.id} movie={movie} />
            ))
        }
      </div>
    </div>
  );
};

export default MovieList;
