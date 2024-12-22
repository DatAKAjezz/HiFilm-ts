import { SkeletonTheme } from "react-loading-skeleton";
import routes from "./routes/routes";
import { MovieProvider, useMovies } from "./context/MovieContext";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import "./App.css";


function App() {

  const { allMovies, setAllMovies } = useMovies();

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/movies");
        setAllMovies(res.data.data.allMovieDetails);
      } catch (err) {
        console.log("Error fetching all movies: ", err);
      }
    };
    fetchAllMovies();
  }, [setAllMovies]);

  useEffect(() => {
    console.log("All movies:", allMovies);
  }, [allMovies]);

  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <RouterProvider router={routes} />
    </SkeletonTheme>
  );
}

export default function AppWithProvider() {
  return (
    <MovieProvider>
      <App />
    </MovieProvider>
  );
}
