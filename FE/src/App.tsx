  import { useEffect, useState } from 'react';
  import './App.css'
  import Header from './components/Header'
  import Home from './pages/Home'
  import { Movie } from './services/types';
  import { getAllMovies } from './services/API';

  function App() {

    const [allMovies, setAllMovies] = useState<Movie[]>([]);

    useEffect(() => {
      const fetchAllMovies = async () => {
        try{
          const data = await getAllMovies();
          if (data) console.log(data);
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
