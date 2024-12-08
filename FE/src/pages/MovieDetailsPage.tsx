import { useNavigate, useParams } from 'react-router-dom'
import '../styles/Details.css'
import { getMovieDetails } from '../services/API';
import { MovieDetails } from './../services/types';
import { useEffect, useState } from 'react';
import YouTubeEmbed from '../components/YouTubeEmbed';
import '../styles/Home.css'
import MovieCarousel from '../components/MovieCarousel';
import { useMovies } from '../context/MovieContext';

const MovieDetailsPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const { slug } = useParams<{slug: string}>();

  const [movie, setMovie] = useState<MovieDetails>();
  const [epTotal, setEpTotal] = useState<string>("0");
  const [infoDiv, setInfoDiv] = useState<JSX.Element>(<></>)
  const [visibleEps, setVisibleEps] = useState<number>(11);
  const [mayLikeMovies, setMayLikeMovies] = useState<MovieDetails[]>([]);

  const navigate = useNavigate();
  const { allMovies } = useMovies();

  useEffect(() => {

    const fetchMovie = async () => {
       console.log(slug);
       const data = await getMovieDetails(slug!);
       setMovie(data);
    }

    fetchMovie();

  }, [slug])

  useEffect(() => {
    console.log(movie);
    console.log(`https://www.youtube.com/embed/${movie?.movie.trailer_url}`)
    let str = movie?.movie.episode_total, str2 = "";
    for(let i = 0; i < str?.length; ++i){
      if (str[i] >= '0' && str[i] <= '9') str2 = str[i] + str2;
    }
    setEpTotal(str2);
    if (movie){
      const mayLikes = allMovies.filter((mv, _) => (
        mv.movie.category.some((type) => 
          movie.movie.category.map(obj => obj.name).includes(type.name)
        )
        && mv.movie.type === movie.movie.type
      ))
      setMayLikeMovies(mayLikes);
    }

  }, [allMovies, movie])

  const [infoType, setInfoType] = useState<number>(0);
  const infos: string[] = ['Thông tin', 'Diễn viên', 'Trailer Phim']

  const handleThongTin = (idx: number) => {
    setInfoType(idx)
  }
  useEffect(() => {
    console.log(visibleEps);
  }, [visibleEps]); 

  useEffect(() => {
    switch(infoType){
      case 0:
        setInfoDiv(
            <div className='episodes'>
              <h3>{movie?.episodes[0].server_data.length > 1 ? "Chọn tập phim" : "Chọn server"}</h3>
              <ul>
                {
                  movie?.episodes[0].server_data.length > 1 ? (
                    movie?.episodes[0].server_data
                    .slice(0, Math.min(visibleEps, movie?.episodes[0].server_data.length))
                    .map((mv, index) => (
                      <li onClick={() => window.open(mv.link_embed)} key={index}>
                        {index === movie?.movie.episode_total - 1 ? `${mv.name} END` : `Tập ${mv.name}`}
                      </li>
                    ))
                  ) : (
                    movie?.episodes.map(sv => (
                        <li onClick={() => {window.open(sv.server_data[0].link_embed)}}>{sv.server_name}</li>
                    ))  
                  )
                }
                { movie?.episodes[0].server_data.length > 1 && visibleEps < movie?.episodes[0].server_data.length ? 
                (<li onClick={() => {setVisibleEps(prev => prev + 12)}} style={{backgroundColor: 'grey'}}>More...</li>) 
                : (<></>) }
              </ul>
            </div>
        )
        break;
      case 1:
        setInfoDiv(          
        <div className = 'tomtat'>
          <h2>Tóm tắt</h2>
          <p dangerouslySetInnerHTML={{__html: movie?.movie.content}}></p>
        </div>)
        break;
      case 2:
        setInfoDiv(<div style ={{textAlign: 'center'}}>lười làm..<main></main></div>)
        break;    
      case 3:
        setInfoDiv(<div>
          <YouTubeEmbed embedId={movie?.movie.trailer_url}/>
        </div>)
        break;
    }
  }, [infoType, movie, movie?.movie.content])
  
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
              {movie?.episodes[0].server_data.length  > 1 ? `${movie?.episodes[0].server_data.length }/${movie?.episodes[0].server_data.length }` : ""}
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
          
          <hr/>

          <div>
            {
              movie?.movie.category.map((tag) => (
                <p>{tag.name}</p>
              ))
            }
          </div>

        </div>
      </div>
    <hr/>
                  
    <div className='thongtin'>
      <ul>
        <li onClick={() => {handleThongTin(0)}} style={{backgroundColor: 'rgb(242, 38, 38)'}}>
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

    {/* <div className = 'thongtin2'>
        <h2>{epTotal > "1" ? "Chọn tập phim" : "Chọn server"}</h2>
        <ul>
          {
            epTotal > "1" ? (
              movie?.episodes[0]?.server_data.map((ep) => (
                <li onClick={() => {window.open(ep.link_embed)}}>Tập {ep.name}</li>
              ))
            ) : (
              movie?.episodes?.map(mv => (
                <li>{mv.server_name}</li>
              ))
            )
          }
        </ul>
    </div> */}
    <div className = 'thongtin2'>
      {infoDiv}
    </div>

    <hr/>

    <div className='maybe-you-like'>
      <h3>Có thể bạn sẽ thích</h3>
      <MovieCarousel data={mayLikeMovies.slice(0, 5)} isInDetails = {true}/>
    </div>

    </div>
  )
}

export default MovieDetailsPage
