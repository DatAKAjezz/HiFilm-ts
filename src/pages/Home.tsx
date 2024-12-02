import React, { useEffect, useState } from 'react'
import { Movie } from '../services/types';
import { getMovieDetails, getNewMovies } from '../services/API';
import '../styles/Home.css'

const HeadContainer = (props: {msg:string}) => {
  return (
    <div className = "head-of-container">
      <p>{props.msg}</p>
      <p>Xem thêm</p>
    </div>
  )
}

const Home = () => {
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(8);
  const [movieDetails, setMovieDetails] = useState<MovieDetail[]>([]);

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
      <div className = 'phim-chieu-rap'>
        <HeadContainer msg = "Phim Chiếu Rạp"/>
        <div className = 'home-movie-container'>
          { 
            movieDetails.map(Obj2 => (
              <img key={Obj2.movie._id} src = {Obj2.movie.thumb_url}></img>
            ))
          }
        </div>
      </div>
      <div className = "phim-bo">

      </div>
      <div className = "phim-le">

      </div>

      <div className = "hoat-hinh">

      </div>

    </div>
  )
}

export default Home
