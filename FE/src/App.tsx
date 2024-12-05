import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import TopMovies from "./components/TopMovies";
import { MovieProvider, useMovies } from "./context/MovieContext";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

function App() {
  const { allMovies, setAllMovies } = useMovies();

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/movies");
        setAllMovies(res.data.data);
      } catch (err) {
        console.log("Error fetching all movies: ", err);
      }
    };
    fetchAllMovies();
  }, [setAllMovies]);

  useEffect(() => {
    console.log("Updated movies:", allMovies);
  }, [allMovies]);

  return (
    <div>
      <Header />
      <BrowserRouter>
          <div className = "home-top-wrapper"> {/*style in TopMovies.css*/}
            <Home />
            <TopMovies />
          </div>
      </BrowserRouter>
    </div>
  );
}

export default function AppWithProvider() {
  return (
    <MovieProvider>
      <App />
    </MovieProvider>
  );
}
