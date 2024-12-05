/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useMovies } from "../context/MovieContext";
import "../styles/TopMovies.css";
import { HeadContainer } from "../pages/Home";
import { MovieDetails } from "./../services/types";
import Skeleton from "react-loading-skeleton";

const TopMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<MovieDetails[]>([]);
  const [isDoneFetching, setIsDoneFetching] = useState<boolean>(false);
  const { allMovies } = useMovies();

  useEffect(() => {
    const fetchMovies = () => {
      const data: MovieDetails[] = allMovies
        .filter((Obj) => Obj.movie.year === 2024 || Obj.movie.year === 2023)
        .sort((a, b) => b.movie.view - a.movie.view);
      console.log("Top: ", trendingMovies);
      if (allMovies.length > 0 && allMovies) {
        setIsDoneFetching(true);
      }
      setTrendingMovies(data);
    };

    fetchMovies();
  }, [allMovies]);

  return (
    <div className="top-movies">
      <HeadContainer msg={"Trending"} class="top-movie-head" />
      <div className="top-movie-container">
        {!isDoneFetching ? (
          Array(6)
          .fill(0)
          .map((_, _index) => (
            <div className = "top-movie-skeleton">
              <Skeleton height={100} width="50%"/>
              <div className="skeleton-wrapper">
                <Skeleton height={20} width="30%" style={{ marginBottom: 8 }} />
                <Skeleton height={20} width="20%" />
              </div>
            </div>
          ))
        ) : (
          trendingMovies
            .filter((_, index) => index < 10)
            .map((Obj) => (
              <div className="top-movie-card" title={Obj.movie.name}>
                <img src={Obj.movie.poster_url}></img>
                <div>
                  <p>{Obj.movie.name}</p>
                  <div>
                    <p>
                      <i
                        className="fa-solid fa-star"
                        style={{ marginRight: "10px" }}
                      ></i>
                      {Obj.movie.tmdb.vote_average.toFixed(1)} | Vote:{" "}
                      {Obj.movie.tmdb.vote_count}
                      <br />
                      <br />
                      <i
                        className="fa-solid fa-eye"
                        style={{ marginRight: "6px" }}
                      ></i>
                      {Obj.movie.view} {Obj.movie.view > 1 ? "views" : "view"}
                    </p>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default TopMovies;
