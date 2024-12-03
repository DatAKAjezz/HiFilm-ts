import React from 'react'
import '../styles/Home.css'
import { PiMonitorPlayLight } from 'react-icons/pi'

const MovieCard = (props: {thumb_url: string, _key: string, vi_name: string, og_name: string, year: number}) => {
  return (
    <div title={props.vi_name} key = {props._key} className = "movie-card" style={{backgroundImage: `url(${props.thumb_url})`}}>
        <PiMonitorPlayLight className = 'play-icon'/>
        <div className = 'card-name-wrapper'>
            <p>{props.vi_name}</p>
            <p>{props.og_name} {'('}{props.year}{')'}</p>
        </div>
    </div>
  )
}

export default MovieCard
