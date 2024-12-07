/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import '../styles/Home.css'
import MovieCard from '../components/MovieCard';
import { MovieDetails } from './../services/types';
import MovieCarousel from '../components/MovieCarousel';
import Skeleton from 'react-loading-skeleton';
import { useMovies } from '../context/MovieContext';

export const HeadContainer = (props: {msg:string, class: string}) => {
  return (
    <div className = {`head-of-container ${props.class}`}>
      <p>{props.msg}</p>
      <p>Xem thêm</p>
    </div>
  )
}

const Home = () => {
  
  const { allMovies } = useMovies();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<MovieDetails[]>([]);

  useEffect(() => {
    const fetchMovies = () => {
      const data: MovieDetails[] = allMovies.sort((a, b) => b.movie.view - a.movie.view);

      if (allMovies.length > 0 && allMovies) {
        setIsLoading(false);
      }
      setMovies(data);
    };

    fetchMovies();
  }, [allMovies]);

  return (
    <div className = 'home-container'>
      <MovieCarousel/>

      {/* MARK: chieu rap
       */}

      <div className = 'phim-container'>
        <HeadContainer msg = "Phim Chiếu Rạp" class = ""/>
        <div className = 'home-movie-container'>
          { 
            isLoading ? (
              Array(8).fill(10).map((_, _index) => (
                <div key={_index} className = 'movie-card-skeleton'>
                  <Skeleton height={260} width="100%"/>
                  <div className="skeleton-wrapper">
                    <Skeleton height={20} width="30%" style={{ marginBottom: 8 }} />
                    <Skeleton height={20} width="20%" />
                  </div>
                </div>
              ))
            ): (movies.filter(Obj => (Obj.movie.type === "single" && Obj.movie.chieurap == true)).map((Obj2,index) => {
              if (index > 7) return;
              return (<MovieCard movie = {Obj2}/>)
            }))
          }
        </div>
      </div>

      {/* _______________________________ */}
      {/* MARK: phim bo
       */}
      <div className = "phim-container" style={{marginTop: '3%'}}>
        <HeadContainer msg = "Phim Bộ" class = ""/>   
        <div className = 'home-movie-container'>
          { 
            isLoading ? (
              Array(8).fill(10).map((_, _index) => (
                <div key={_index} className = 'movie-card-skeleton'>
                  <Skeleton height={260} width="100%"/>
                  <div className="skeleton-wrapper">
                    <Skeleton height={20} width="30%" style={{ marginBottom: 8 }} />
                    <Skeleton height={20} width="20%" />
                  </div>
                </div>
              ))
            ): (movies.filter(Obj => (Obj.movie.type === "series")).map((Obj2,index) => {
              if (index > 7) return;
              return (<MovieCard movie = {Obj2}/>)
            }))
          }
        </div>     
      </div>

      {/* ___________________________________________________________- */}
      {/* MARK: hoat hinh */}

      <div className = "phim-container" style={{marginTop: '3%'}}>
        <HeadContainer msg = "Hoạt Hình" class = ""/>   
        <div className = 'home-movie-container'>
          { 
            isLoading ? (
              Array(8).fill(10).map((_, _index) => (
                <div key={_index} className = 'movie-card-skeleton'>
                  <Skeleton height={260} width="100%"/>
                  <div className="skeleton-wrapper">
                    <Skeleton height={20} width="30%" style={{ marginBottom: 8 }} />
                    <Skeleton height={20} width="20%" />
                  </div>
                </div>
              ))
            ): (movies.filter(Obj => (Obj.movie.type === "hoathinh" && Obj.movie.year === 2024)).map((Obj2,index) => {
              if (index > 7) return;
              return (<MovieCard movie = {Obj2}/>)
            }))
          }
        </div>     
      </div>
      
      {/* ___________________________________________________________*/}
      {/*MARK: phim le
       */}
      {/* <div className = "phim-container" style={{marginTop: '2%'}}>
        <HeadContainer msg = "Phim Lẻ" class = ""/>   
        <div className = 'home-movie-container'>
          { 
            isLoading ? (
              Array(8).fill(10).map((_, _index) => (
                <div className = 'movie-card-skeleton'>
                  <Skeleton height={260} width="100%"/>
                  <div className="skeleton-wrapper">
                    <Skeleton height={20} width="30%" style={{ marginBottom: 8 }} />
                    <Skeleton height={20} width="20%" />
                  </div>
                </div>
              ))
            ): (movies.filter(Obj => (Obj.movie.type === "single" && Obj.movie.chieurap == false)).map((Obj2,index) => {
              if (index > 7) return;
              return (<MovieCard movie = {Obj2}/>)
            }))
          }
        </div>     
      </div> */}
    </div>
  )
}

export default Home
