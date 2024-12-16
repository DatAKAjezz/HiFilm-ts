import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HeadContainer } from "../pages/Home";
import { MovieDetails } from "../services/types";
import { PiMonitorPlayLight } from "react-icons/pi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import '../styles/Details.css'
import { useEffect } from "react";

const MovieCarousel = (props: {isInDetails: boolean, data: MovieDetails[]}) => {

  const navigate = useNavigate();

  useEffect(() => {console.log(props.data)}, [props.data])

  return (
    <div className={`new-movie-stage ${props.isInDetails ? 'details-carousel' : ''}`}  >
      {!props.isInDetails ? <HeadContainer 
                                handle = {() => {
                                  navigate('/search?q=&sort=Lượt+xem&type=&genre=&country=&year=&isNavigated= ')
                                }} 
                                msg="Phim Mới" class="" 
                            /> : <></> }
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={4}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: true,
        }}
        loop
        className="new-movie-container"
      >
        {props.data.length === 0
          ? Array(5) 
              .fill(0)
              .map((_, index) => (
                <SwiperSlide key={index} className="new-movie-card-wrapper">
                  <div className="movie-card new-movie-card skeleton-card">
                    <Skeleton height={250} width="100%" />
                    <div className="skeleton-text-wrapper">
                      <Skeleton height={20} width="80%" style={{ marginBottom: 8 }} />
                      <Skeleton height={20} width="60%" />
                    </div>
                  </div>
                </SwiperSlide>
              ))
          : props.data
              .filter((_, index) => index < 5)
              .map((Obj) => (
                <SwiperSlide key={Obj.movie._id} className="new-movie-card-wrapper">
                  <div
                    title={Obj.movie.name}
                    className="movie-card new-movie-card"
                    style={{ backgroundImage: `linear-gradient(
                                                    rgba(0, 0, 0, 0), 
                                                    rgba(0, 0, 0, 0.65)
                                                  ),url(${Obj.movie.poster_url})` }}
                    onClick={() => {navigate(`/${Obj.movie.slug}`)}}
                  >
                    <PiMonitorPlayLight className="play-icon" />
                    <div className="card-name-wrapper">
                      <p>{Obj.movie.name}</p>
                      <p>
                        {Obj.movie.origin_name} {"("}
                        {Obj.movie.year}
                        {")"}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
      </Swiper>
    </div>
  );
};

export default MovieCarousel;
