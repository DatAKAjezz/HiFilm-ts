import { useEffect, useState } from 'react';
import { useMovies } from '../context/MovieContext'
import '../styles/TopMovies.css'
import { HeadContainer } from '../pages/Home';
import { MovieDetails } from './../services/types';

const TopMovies = () => {

  const [trendingMovies, setTrendingMovies] = useState<MovieDetails[]>([]);
  const { allMovies } = useMovies();

  useEffect(() => {
    setTrendingMovies(allMovies.filter((Obj) => (Obj.movie.year === 2024)).sort((a, b) => (b.movie.view - a.movie.view)));
    console.log("Top: ",trendingMovies)
  }, [allMovies])

  return (
    <div className='top-movies'>
      <HeadContainer msg = {"Trending"} class = 'top-movie-head'/>
      <div className = 'top-movie-container'>
        {
          trendingMovies.filter((Obj2, index) => index < 10).map((Obj) => (
            <div className='top-movie-card'>
              <img src = {Obj.movie.poster_url}></img>
              <div>
                <p>
                  {Obj.movie.name}
                </p>
                <div>
                  <i className="fa-solid fa-star"></i>
                  <p>{Obj.movie.tmdb.vote_average.toFixed(1)} | Vote: {Obj.movie.tmdb.vote_count}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default TopMovies
