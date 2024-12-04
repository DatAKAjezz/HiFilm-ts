import React, { useEffect, useState } from 'react'
import { Movie } from '../services/types';
import { getMovieDetails, getNewMovies } from '../services/API';
import '../styles/Home.css'
import MovieCard from '../components/MovieCard';
import { MovieDetails } from './../services/types';
import MovieCarousel from '../components/MovieCarousel';

export const HeadContainer = (props: {msg:string}) => {
  return (
    <div className = "head-of-container">
      <p>{props.msg}</p>
      <p>Xem thêm</p>
    </div>
  )
}

const Home = () => {
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(4);
  const [movieDetails, setMovieDetails] = useState<MovieDetails[]>([]);

  useEffect(() => {

    const fetchMovie = async () => {
      try{
        const data = await getNewMovies(page);
        setMovies(data.items);

        const detailsPromises = data.items.map((movie) => {
          return getMovieDetails(movie.slug);
        })

        const details = await Promise.all(detailsPromises);
        setMovieDetails(details);
        console.log(details); 
      }
      catch (err){
        console.log("Error fetching: ", err);
      }
    }

    fetchMovie();

  }, [page])

  return (
    <div className = 'home-container'>
      <MovieCarousel data = {movieDetails}/>

      <div className = 'phim-container'>
        <HeadContainer msg = "Phim Chiếu Rạp"/>
        <div className = 'home-movie-container'>
          { 
            movieDetails.filter(Obj => (Obj.movie.type === "single" && Obj.movie.chieurap == false)).map(Obj2 => (
              <MovieCard key={Obj2.movie._id} 
                        _key={Obj2.movie._id} 
                        thumb_url = {Obj2.movie.thumb_url}
                        vi_name = {Obj2.movie.name}
                        og_name = {Obj2.movie.origin_name}
                        year = {Obj2.movie.year}
              />
            ))
          }
        </div>
      </div>
      <div className = "phim-container">
        <HeadContainer msg = "Phim Bộ"/>   
        <div className = "home-movie-container">
        { 
            movieDetails.filter(Obj => (Obj.movie.type === "series")).map(Obj2 => (
              <MovieCard key={Obj2.movie._id} 
              _key={Obj2.movie._id} 
              thumb_url = {Obj2.movie.thumb_url}
              vi_name = {Obj2.movie.name}
              og_name = {Obj2.movie.origin_name}
              year = {Obj2.movie.year}
              />
            ))
          }
        </div>       
      </div>
      <div className = "phim-le">

      </div>

      <div className = "hoat-hinh">

      </div>

    </div>
  )
}

export default Home
