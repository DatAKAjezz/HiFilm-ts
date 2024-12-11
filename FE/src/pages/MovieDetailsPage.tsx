import { useNavigate, useParams } from 'react-router-dom'
import '../styles/Details.css'
import { getMovieDetails } from '../services/API';
import { MovieDetails } from './../services/types';
import { useEffect, useState } from 'react';
import '../styles/Home.css'
import MovieCarousel from '../components/MovieCarousel';
import { useMovies } from '../context/MovieContext';
import YoutubeEmbed from '../components/YoutubeEmbed';
import MainVideo from '../components/MainVideo';
import { RxTrackNext, RxTrackPrevious } from 'react-icons/rx';
import { BsMenuButtonWideFill } from 'react-icons/bs';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import BreadScrumb from '../components/BreadScrumb';

const MovieDetailsPage = () => {

  const {slug, ep, sep } = useParams();
  useEffect(() => {console.log(ep, sep, slug)}, [slug, ep, sep])


  const [movie, setMovie] = useState<MovieDetails>();
  // const [epTotal, setEpTotal] = useState<string>("0");
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
    // eslint-disable-next-line prefer-const
    let str = movie ? movie?.movie.episode_total : undefined, str2 = "";
    if (str)
      for(let i = 0; i < str?.length; ++i){
        if (str[i] >= '0' && str[i] <= '9') str2 = str[i] + str2;
      }
    if (movie){
      const mayLikes = allMovies.filter((mv) => (
        mv.movie.category.some((type) => 
          movie.movie.category.map(obj => obj.name).includes(type.name)
        )
        && mv.movie.type === movie.movie.type && mv.movie.slug !== movie.movie.slug
      ))
      setMayLikeMovies(mayLikes);
    }

  }, [allMovies, movie])

  // Eps and Server__________________________________

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(sep,' ' ,ep)
  }, [ep, sep])

  const [currentServer, setCurrentServer] = useState<number>(0);

  const handleNavigateEpisode = (sv: number, ep: number) => {
    navigate(`/${movie?.movie.slug}/${ep}/${sv}`)
  }

  const [infoType, setInfoType] = useState<number>(0);
  const infos: string[] = ['Thông tin', 'Diễn viên', 'Trailer Phim']

  const handleThongTin = (idx: number) => {
    setInfoType(idx)
  }

  useEffect(() => {
    switch(infoType){
      case 0:
        setInfoDiv(
            <div className='episodes'>
              <div className='episode-container'>

                <ul className='server'>
                <h3>Chọn server</h3>
                  {
                    movie?.episodes.map((sv, index) => (
                      <li onClick={() => {
                        setCurrentServer(index);
                      }}
                      className={`${index === currentServer ? 'active-server' : ''}`}
                      >{sv.server_name}</li>
                    ))
                  }
                </ul>

                <ul className='episode'>
                <h3>Chọn tập phim</h3>
                {
                    movie?.episodes[currentServer].server_data
                    .slice(0, Math.min(visibleEps, movie?.episodes[0].server_data.length))
                    .map((mv, index) => (
                      <li onClick={() => {
                          handleNavigateEpisode(currentServer, index);
                        }} 
                        key={index}
                        className = {`${index === Number(ep) ? 'active-episode' : ''}`}
                        >
                        {index === Number(movie?.movie.episode_total) - 1 ? `${mv.name} END` : `Tập ${mv.name}`}
                      </li>
                    ))
                }
                { 
                  (movie?.episodes[0].server_data.length ?? 0) > 1 
                    && visibleEps < (movie?.episodes[0].server_data.length ?? 0) ? 
                  (<li onClick={() => {setVisibleEps(prev => prev + 12)}} 
                       style={{backgroundColor: 'grey'}}>More...</li>) 
                  : (<></>) 
                }
                </ul>

              </div>
            </div>
        )
        break;
      case 1:
        setInfoDiv(          
        <div className = 'tomtat'>
          <h2>Tóm tắt</h2>
          <p dangerouslySetInnerHTML={{__html: movie? movie?.movie.content : <></>}}></p>
        </div>)
        break;
      case 2:
        setInfoDiv(<div style ={{textAlign: 'center'}}>lười làm..</div>)
        break;    
      case 3:
        setInfoDiv(<div>
          <YoutubeEmbed embedId={movie?.movie.trailer_url} class={''}/>
        </div>)
        break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoType, movie, movie?.movie.content, visibleEps, currentServer, ep])
  

  const handleNext = () => {
    if (Number(ep) < ( movie?.episodes[0].server_data.length ?? 0)){
      navigate(`/${movie?.movie.slug}/${Number(ep) + 1}/${currentServer}`)
    }
  }

  const handlePrevious = () => {
    if (Number(ep) > 0){
      navigate(`/${movie?.movie.slug}/${Number(ep) - 1}/${currentServer}`)
    }
  }


  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.target as HTMLElement).tagName === "INPUT" || 
         (e.target as HTMLElement).tagName === "TEXTAREA") return;
    e.preventDefault();
    if (e.key === 'ArrowRight' && e.shiftKey && Number(ep) + 1 != movie?.episodes[0].server_data.length) {
        console.log('next')
        handleNext();
    }  
    if (e.key === 'ArrowLeft' && e.shiftKey && Number(ep) != 0 && movie?.episodes[0].server_data.length != 1) 
      {
        console.log('prev')
        handlePrevious();
      }
    }
  
  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent) => handleKeyDown(e);
    window.addEventListener('keydown', handleKeyEvent);
  
    return () => {
      window.removeEventListener('keydown', handleKeyEvent);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleNext, handlePrevious]);  

  // MARK: return
  return (
    <div className = 'detail-wrapper'>
    <BreadScrumb movie = {movie}/>
    {
      (sep && ep) ?  
        (<>
          <MainVideo url={movie?.episodes[Number(sep)].server_data[Number(ep)].link_embed} data = {movie?.episodes}/>
          <p className='episode-name'>{movie?.movie.name}: {`Tập ${movie?.episodes[Number(sep)].server_data[Number(ep)].name }`}</p>
          <div className='video-button'>
            <div>
              <RxTrackPrevious 
                className={`con ${Number(ep) == 0 || movie?.episodes[0].server_data.length == 1 ? 'inactive' : ''}`} 
                onClick={handlePrevious}
              />
              <p style={{color: Number(ep) == 0 || movie?.episodes[0].server_data.length == 1 ? 'grey' : ''}}>
                Shift +&nbsp;<FaArrowLeft />
              </p> 
            </div>
            <BsMenuButtonWideFill 
              className='con'
              onClick={() => {
                navigate(`/${movie?.movie.slug}`)
              }}
            /> 
            <div>
              <RxTrackNext 
                className={`con ${Number(ep) == (movie?.episodes[0].server_data.length ?? 0) - 1 ? 'inactive' : ''}`} 
                onClick={handleNext}
              />  
              <p style={{color: Number(ep) == (movie?.episodes[0].server_data.length ?? 0) - 1 ? 'grey' : ''}}>
                {'Shift +'}&nbsp;<FaArrowRight/>
              </p> 
            </div>
          </div> 
        </>) 
        : (
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
              {(movie ? movie?.episodes[0].server_data.length : 0) > 1 ? `${movie?.episodes[0].server_data.length }/${movie?.episodes[0].server_data.length }` : ""}
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
                  (<i key={index} style={{color: index < Math.floor(Number(movie?.movie.tmdb.vote_average)) ? "yellow" : ""}} 
                      className='fa fa-star'></i>))}  
              </div>
              <p>Vote: {movie?.movie.tmdb.vote_count}  &nbsp;| &nbsp;<i className="fa-solid fa-eye"></i>&nbsp;
                       {movie?.movie.view}
              </p>
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
      )
    }

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
