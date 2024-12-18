import { useNavigate } from 'react-router-dom'
import { MovieDetails } from '../services/types'
import '../styles/MovieCard.css'
import { PiMonitorPlayLight } from 'react-icons/pi'

const MovieCard = (props: {movie: MovieDetails}) => {
  const navigate = useNavigate();
  const isSeries = props.movie.episodes[0].server_data.length > 1;
  return (
  <div key = {props.movie.movie._id} onClick={() => { navigate(`/${props.movie.movie.slug}`)}} 
       style = {{width: '22.5%', height: '330px', position: 'relative'}} className='movie-card-wrapper'>
    {
      isSeries && props.movie.movie.status === 'ongoing' ? (<div className = 'movie-status'>
        {`Tập ${props.movie.episodes[0].server_data.length}`}
      </div>) : (<></>)
    }
    {
      isSeries && props.movie.movie.status != 'ongoing' ? <div className='movie-wrapped-up'>
        Hoàn Tất
      </div> : <></>
    }
    <div title={props.movie.movie.name} key = {props.movie.movie._id} className = "movie-card" 
        style={{backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0) 70%, 
          rgba(0, 0, 0, 0.65)
        ), url(${props.movie.movie.thumb_url})`}}>

        <PiMonitorPlayLight className = 'play-icon'/>
        <div className = 'card-name-wrapper'>
            <p>{props.movie.movie.name}</p>
            <p>{props.movie.movie.origin_name} {'('}{props.movie.movie.year}{')'}</p>
        </div>
    </div>
    {/* <p>{props.movie.movie.quality}</p> */}
  </div>
  )
}

export default MovieCard
