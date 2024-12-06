/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom"
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
    const [typeOfSearch, setTypeOfSearch] = useState<number>();
    const [chieurap, setChieurap] = useState<boolean>(false);

    const listTypeOfSearch = ["series", "single", "hoathinh"]

    // const navigate = useNavigate();

    const query = searchParam.get("q") || "";

    useEffect(() => {
      const filter = allMovies.filter((movie) => (
        movie.movie.name.toLowerCase().includes(query.toLowerCase())
        || movie.movie.origin_name.toLowerCase().includes(query.toLowerCase()) 
      ))
      setFilteredList(filter);
      setIsLoading(false);
    }, [query, allMovies])

    const handleTypeSearch = (idx: number) => {
      setTypeOfSearch(idx);
      if (idx == 1) {setChieurap(prev => !prev)}
      const filter = allMovies.filter((Obj) => (Obj.movie.type === listTypeOfSearch[idx - 2]
                                                && Obj.movie.chieurap === chieurap));
      console.log("Filter: ", filter);
      setFilteredList(filter);
    }

  return (
    <div className = 'home-container'>
      <HeadContainer msg = {`Tìm Kiếm`} class = "search-head"/>
      <div className="filter-wrapper">

        <p>Lọc theo </p>
        <div className = 'filter'>
          <button>View</button>
          <button>Vote</button>
          <button>Rate</button>
          <button>Year</button>
          <button className={chieurap === true ? "active-type" : ""} onClick={() => {handleTypeSearch(1)}}>Chiếu rạp</button>
          <button className={typeOfSearch == 2 ? "active-type" : ""} onClick={() => {handleTypeSearch(2)}}>Phim bộ</button>
          <button className={typeOfSearch == 3 ? "active-type" : ""} onClick={() => {handleTypeSearch(3)}}>Phim lẻ</button>
          <button className={typeOfSearch == 4 ? "active-type" : ""} onClick={() => {handleTypeSearch(4)}}>Hoạt hình</button>
        </div>
      </div>
      <div className = 'phim-container'>
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
            ): (filteredList.map((Obj2,index) => {
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
