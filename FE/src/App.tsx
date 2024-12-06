import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import TopMovies from "./components/TopMovies";
import { MovieProvider, useMovies } from "./context/MovieContext";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";
import Footer from "./components/Footer";
import SearchResult from "./pages/SearchResult";

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
        <SkeletonTheme baseColor = "#313131" highlightColor="#525252">
              {/*style in TopMovies.css*/}
              <BrowserRouter>
                <div className = 'all-container'>
                <Header />

                <Routes>
                  <Route path = "/" element = {<Home/>} />
                  <Route path = '/search' element = {<SearchResult/>}/>
                </Routes>
                <TopMovies />
                </div>
              </BrowserRouter>                        
          <Footer/>
        </SkeletonTheme>
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
