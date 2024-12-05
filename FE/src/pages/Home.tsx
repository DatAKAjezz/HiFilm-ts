import { useEffect, useState } from 'react'
import { getMovieDetailsWithPage  } from '../services/API';
import '../styles/Home.css'
import MovieCard from '../components/MovieCard';
import { MovieDetails } from './../services/types';
import MovieCarousel from '../components/MovieCarousel';

export const HeadContainer = (props: {msg:string, class: string}) => {
  return (
    <div className = {`head-of-container ${props.class}`}>
      <p>{props.msg}</p>
      <p>Xem thêm</p>
    </div>
  )
}

const Home = () => {
  
  const [page, _] = useState<number>(5);
  const [movieDetails, setMovieDetails] = useState<MovieDetails[]>([]);

  useEffect(() => {

    const fetchMovie = async () => {
      try{
        const details = await getMovieDetailsWithPage(page);
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
      <MovieCarousel/>

      <div className = 'phim-container'>
        <HeadContainer msg = "Phim Chiếu Rạp" class = ""/>
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
        <HeadContainer msg = "Phim Bộ" class = ""/>   
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
