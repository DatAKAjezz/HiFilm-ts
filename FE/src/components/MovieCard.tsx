import { MovieDetails } from '../services/types'
import '../styles/Home.css'
import { PiMonitorPlayLight } from 'react-icons/pi'

const MovieCard = (props: {movie: MovieDetails}) => {
  return (
  <div style = {{width: '22.5%', height: '330px', position: 'relative'}} className='movie-card-wrapper'>
    <div title={props.movie.movie.name} key = {props.movie.movie._id} className = "movie-card" 
        style={{backgroundImage: `url(${props.movie.movie.thumb_url})`}}>

        <PiMonitorPlayLight className = 'play-icon'/>
        <div className = 'card-name-wrapper'>
            <p>{props.movie.movie.name}</p>
            <p>{props.movie.movie.origin_name} {'('}{props.movie.movie.year}{')'}</p>
        </div>
    </div>
    <p>{props.movie.movie.quality}</p>
  </div>
  )
}

export default MovieCard
