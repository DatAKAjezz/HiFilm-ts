import { useEffect, useState } from "react";
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
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  const { allMovies, setAllMovies } = useMovies();

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/movies");
        setAllMovies(res.data.data);
        let st = new Set();
        res.data.data.forEach(movie => {
          movie.movie.country.forEach(ct => {
            st.add(ct.name);
          })
        })

        console.log(st);
      } catch (err) {
        console.log("Error fetching all movies: ", err);
      }
    };
    fetchAllMovies();
  }, []);

  useEffect(() => {
    console.log("Updated movies:", allMovies);
  }, [allMovies]);

  return (
    <div>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        {/*style in TopMovies.css*/}
        <BrowserRouter>
          <div className="all-container">
            <Header/>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <TopMovies />
                  </>
                }
              />
              <Route
                path="/search"
                element={ 
                  <>
                    <SearchResult />
                    <TopMovies />
                  </>
                }
              />
              <Route path="/:slug" element={<><MovieDetailsPage /><TopMovies/></>} />
              <Route path="/:slug/:ep/:sep" element={<><MovieDetailsPage /><TopMovies/></>}/>
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
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
