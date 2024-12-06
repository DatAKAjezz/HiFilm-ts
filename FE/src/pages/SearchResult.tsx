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
    const [filteredList2, setFilteredList2] = useState<MovieDetails[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [typeOfSearch, setTypeOfSearch] = useState<number>();
    const [chieurap, setChieurap] = useState<boolean>(false);

    const listTypeOfSearch = ["series", "single", "hoathinh"]

    // const navigate = useNavigate();

    const query = searchParam.get("q") || "";

    useEffect(() => {
      setTypeOfSearch(0);
      setChieurap(false);
    }, [query])

    useEffect(() => {
      const filter = allMovies.filter((movie) => (
        movie.movie.name.toLowerCase().includes(query.toLowerCase())
        || movie.movie.origin_name.toLowerCase().includes(query.toLowerCase()) 
      ))
      setFilteredList(filter);
      setFilteredList2(filter);
      setIsLoading(false);
    }, [query, allMovies])

    const handleTypeSearch = (idx: number) => {
      if (idx !== 1) setTypeOfSearch(idx);
      if (idx == 1) { setChieurap(prev => !prev)  }
      let filter = filteredList2.filter((Obj) => (Obj.movie.type === listTypeOfSearch[idx - 2]));
      if (chieurap){
        filter = filter.filter((Obj) => (Obj.movie.chieurap === true));
      }

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
            ): (filteredList.length === 0 ? (<div>Bruh! Nothing found :(</div>):(filteredList?.map((Obj2,index) => {
              if (index > 11) return;
              return (<MovieCard movie = {Obj2}/>)
            })))
          }
        </div>
      </div>
    </div>
  )
}

export default SearchResult
