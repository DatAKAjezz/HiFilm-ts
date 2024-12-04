import { useEffect } from 'react';
import { useMovies } from '../context/MovieContext'
import '../styles/TopMovies.css'

const TopMovies = () => {

  const { allMovies } = useMovies();

  useEffect(() => {
    allMovies.sort((a, b) => (b.view - a.view));
    console.log("Top: ",allMovies)
  }, [allMovies])

  return (
    <div className='top-movies'>
      
    </div>
  )
}

export default TopMovies
