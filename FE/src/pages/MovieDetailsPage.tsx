import { useNavigate, useParams } from 'react-router-dom'
import '../styles/Details.css'
import { getMovieDetails } from '../services/API';
import { MovieDetails } from './../services/types';
import { useEffect, useState } from 'react';

const MovieDetailsPage = () => {

  const { slug } = useParams<{slug: string}>();

  const [movie, setMovie] = useState<MovieDetails>();
  const [epTotal, setEpTotal] = useState<string>("0");

  const navigate = useNavigate();

  useEffect(() => {

    const fetchMovie = async () => {
       console.log(slug);
       const data = await getMovieDetails(slug);
       setMovie(data);
    }

    fetchMovie();

  }, [slug])

  useEffect(() => {
    console.log(movie)
    let str = movie?.movie.episode_total, str2 = "";
    for(let i = 0; i < str?.length; ++i){
      if (str[i] >= '0' && str[i] <= '9') str2 = str[i] + str2;
    }
    setEpTotal(str2);

  }, [movie])

  const [infoType, setInfoType] = useState<number>(1);
  const infos: string[] = ['Thông tin', 'Diễn viên', 'Trailer Phim']

  const handleThongTin = (idx: number) => {
    setInfoType(idx)
  }
  
  
  return (
    <div className = 'detail-wrapper'>

      <div className='detail-container'>
        <div>
          <img src = {movie?.movie.thumb_url}></img>
        </div>
        <div className='right'>
          
          <div>
            <h2>{movie?.movie.name}</h2>
            <p>({movie?.movie.origin_name} {movie?.movie.year})</p>
            <p>
              {movie?.movie.status ? "FULL" : "NEW"} {" "}
              {epTotal > "1" ? `${epTotal}/${epTotal}` : ""}
              {" "}VIETSUB
            </p>
          </div>
          
          <hr/>

          <div>
            <div>
              {movie?.movie.tmdb.vote_average.toFixed(1)}
            </div>
            <div>
              <div>
                {Array(10).fill(0).map((_, index) => 
                  (<i key={index} style={{color: index < Math.floor(movie?.movie.tmdb.vote_average) ? "yellow" : ""}} 
                      className='fa fa-star'></i>))}  
              </div>
              <p>Vote: {movie?.movie.tmdb.vote_count}</p>
            </div>
          </div>
          
        </div>
      </div>
    <hr/>
                  
    <div className='thongtin'>
      <ul>
        <li onClick={() => {window.open(movie?.movie.trailer_url)}} style={{backgroundColor: 'rgb(242, 38, 38)'}}>
          <i style={{marginRight: '4px'}} className="fa-solid fa-play"></i> Xem phim
        </li>
        {
          infos.map((info, index) => (
            <li key={index} className={infoType == index + 1 ? 'active' : ''} onClick={() => {handleThongTin(index + 1)}}>
              {info}
            </li>
          ))
        }
      </ul>
    </div>
    <hr/>

    </div>
  )
}

export default MovieDetailsPage
