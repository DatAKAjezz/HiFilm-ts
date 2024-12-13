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
    const [filteredList2, setFilteredList2] = useState<MovieDetails[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // const navigate = useNavigate();

    const query = searchParam.get("q") || "";    

    useEffect(() => {
      const filter = allMovies.filter((movie) => (
        movie.movie.name.toLowerCase().includes(query.toLowerCase())
        || movie.movie.origin_name.toLowerCase().includes(query.toLowerCase()) 
      ))
      setFilteredList(filter);
      setFilteredList2(filter);
      setIsLoading(false);
    }, [query, allMovies])

  const typePhim = ['Chiếu rạp', 'Phim Lẻ', 'Phim bộ'];
  const genres = [
    "Chính kịch",
    "Bí ẩn",
    "Tình Cảm",
    "Tâm Lý",
    "Gia Đình",
    "Âm Nhạc",
    "Hài Hước",
    "Võ Thuật",
    "Cổ Trang",
    "Viễn Tưởng",
    "Khoa Học",
    "Hành Động",
    "Hình Sự",
    "Phiêu Lưu",
    "Học Đường",
    "Thần Thoại",
    "Chiến Tranh",
    "Kinh Dị",
    "Tài Liệu",
    "Phim 18+",
    "Thể Thao",
    "Kinh Điển"
  ];
  const years = [
    2024, 2023,2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
    2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003,
    2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993,
    1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985, 1984, 1983,
    1982, 1981, 1980, 1979, 1978, 1977, 1976, 1975, 1974, 1973,
    1972, 1971, 1970, 1969, 1968, 1967, 1966, 1965, 1964, 1963,
    1962, 1961, 1960, 1959, 1958, 1957, 1956, 1955, 1954, 1953,
    1952, 1951, 1950, 1949, 1948, 1947, 1946, 1945, 1944, 1943,
    1942, 1941, 1940, 1939, 1938, 1937, 1936, 1934, 1933, 1932,
    1931, 1930, 1928, 1925, 1924, 1923, 1921, 1920, 1918, 1914
  ];
  const countries = [
    "Âu Mỹ", "Argentina", "Anh", "Ả Rập Xê Út", "Ấn Độ", "Ba lan",
    "Bỉ", "Bồ Đào Nha", "Brazil", "Canada", "Chile", "Colombia",
    "Đài Loan", "Đan Mạch", "Đức", "Hà Lan", "Hàn Quốc", "Hồng Kông",
    "Hy Lạp", "Indonesia", "Ireland", "Malaysia", "Mexico", "Nam Phi",
    "Na Uy", "Nga", "Nigeria", "Pháp", "Phần Lan", "Philippines",
    "Quốc Gia Khác", "Singapore", "Tây Ban Nha", "Thái Lan", 
    "Thổ Nhĩ Kỳ", "Thụy Điển", "Thụy Sĩ", "UAE", "Ukraina", "Úc", 
    "Việt Nam"
  ];
  
  

  return (
    <div className = 'home-container'>
      <HeadContainer msg = {`Tìm Kiếm`} class = "search-head"/>
      <div className="block-search">
        <p>Lọc theo</p>
        <select>
          {
            typePhim.map(el => (
              <option>{el}</option>
            ))
          }
        </select>
        <select>
          {
            genres.map(el => (
              <option>{el}</option>
            ))
          }
        </select>
        <select>
          {
            countries.map(el => (
              <option>{el}</option>
            ))
          }
        </select>
        <select>
          {
            years.map(el => (
              <option>{el}</option>
            ))
          }
        </select>
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
            ): (filteredList.length === 0 ? (<div className = "nothing-found">Nga! Empty ahh List💀</div>)
                      :(filteredList?.map((Obj2, index) => {
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
