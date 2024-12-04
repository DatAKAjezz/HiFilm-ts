  import { useEffect, useState } from 'react';
  import './App.css'
  import Header from './components/Header'
  import Home from './pages/Home'
  import { Movie } from './services/types';
  import { getAllMovies } from './services/API';
import axios, { all } from 'axios';

  function App() {

    const [allMovies, setAllMovies] = useState<Movie[]>([]);

    useEffect(() => {
      const fetchAllMovies = async () => {
        try{
          const res = await axios.get('http://localhost:3000/api/movies');
          setAllMovies(res.data.data);
          console.log(allMovies);
        }
        catch(err){
          console.log("Error fetching all movies: ", err);
        }
      }
      fetchAllMovies();
    }, [])

    return (
      <div>
        <Header/>
        <Home/>
      </div>
    )
  }

  export default App
