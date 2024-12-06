/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSearchParams } from "react-router-dom"
import { useMovies } from "../context/MovieContext"
import "../styles/Home.css"
import "../styles/Search.css"
import { HeadContainer } from "./Home"
import { MovieDetails } from "../services/types"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import MovieCard from "../components/MovieCard"

const SearchResult = () => {

    const { allMovies } = useMovies();
    const [searchParam] = useSearchParams();
    const [filteredList, setFilteredList] = useState<MovieDetails[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const query = searchParam.get("q") || "";

    useEffect(() => {
      const filter = allMovies.filter((movie) => (
        movie.movie.name.toLowerCase().includes(query.toLowerCase())
        || movie.movie.origin_name.toLowerCase().includes(query.toLowerCase()) 
      ))
      setFilteredList(filter);
      setIsLoading(false);
    }, [query, allMovies])


  return (
    <div className = 'home-container'>
      <div className = 'phim-container' style={{marginTop: '2%'}}>
        <HeadContainer msg = {`Tìm Kiếm`} class = ""/>
        <div className="home-movie-container">
        { 
              isLoading ? (
                Array(8).fill(0).map((_, _index) => (
                  <div className = 'movie-card-skeleton'>
                    <Skeleton height={260} width="100%"/>
                    <div className="skeleton-wrapper">
                      <Skeleton height={20} width="30%" style={{ marginBottom: 8 }} />
                      <Skeleton height={20} width="20%" />
                    </div>
                  </div>
                ))
              ): (filteredList  .map((Obj2,index) => {
                if (index > 11) return;
                return (<MovieCard movie = {Obj2}/>)
              }))
            }
        </div>
      </div>
    </div>
  )
}

export default SearchResult
