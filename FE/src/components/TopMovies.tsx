/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useMovies } from "../context/MovieContext";
import "../styles/TopMovies.css";
import { MovieDetails } from "./../services/types";
import Skeleton from "react-loading-skeleton";
import { HiFire } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const TopMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState<MovieDetails[]>([]);
  const [trendingMovies2, setTrendingMovies2] = useState<MovieDetails[]>([]);
  const [isDoneFetching, setIsDoneFetching] = useState<boolean>(false);
  const { allMovies } = useMovies();
  const [filterType, setFilterType] = useState<number>(0);

  const navigate = useNavigate();

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
      setTrendingMovies2(data);
    };

    fetchMovies();
  }, [allMovies]);

  const handleFilter = (idx: number) => {
    if (idx == 0){
      setFilterType(0);
      setTrendingMovies(trendingMovies2);
    }
    else if (idx == 1){
      setFilterType(1);
      setTrendingMovies(trendingMovies2.filter(Obj => (Obj.movie.type == 'series' || Obj.movie.type == 'tv')))
    }
    else{
      setFilterType(2);
      setTrendingMovies(trendingMovies2.filter(Obj => (Obj.movie.type === 'single')));
    }
  }

  return (
    <div className="top-movies">

      <div className="top-movie-head" >
        <ul>
          <li style={{color: filterType == 0 ? "red" : "white"}} onClick = {() => {handleFilter(0)}}>Hot <HiFire id="fire-icon"/></li>
          <li style={{color: filterType == 1 ? "red" : "white"}} onClick = {() => {handleFilter(1)}}>Series/TV</li>
          <li style={{color: filterType == 2 ? "red" : "white"}} onClick = {() => {handleFilter(2)}}>Movie</li>
        </ul>
      </div>
      <div className="top-movie-container">
        {!isDoneFetching ? (
          Array(6)
          .fill(0)
          .map((_, _index) => (
            <div key={_index} className = "top-movie-skeleton">
              <Skeleton height={100} width="50%"/>
              <div className="skeleton-wrapper">
                <Skeleton height={20} width="30%" style={{ marginBottom: 8 }} />
                <Skeleton height={20} width="20%" />
              </div>
            </div>
          ))
        ) : (
          trendingMovies
            .filter((_, index) => index < 9)
            .map((Obj,idx) => (
              <div key = {idx} className="top-movie-card" 
                   title={Obj.movie.name} 
                   onClick={() => {navigate(`phim/${Obj.movie.slug}`)}}
              >
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
