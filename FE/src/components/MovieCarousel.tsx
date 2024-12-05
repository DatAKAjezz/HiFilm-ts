import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HeadContainer } from "../pages/Home";
import { MovieDetails } from "../services/types";
import { PiMonitorPlayLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { getMovieDetailsWithPage } from "../services/API";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieCarousel = () => {
  const [movies, setMovies] = useState<MovieDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetailsWithPage(1);
        setMovies(data);
      } catch (err) {
        console.log("Error fetching Carousel: ", err);
      } finally {
        setLoading(false); 
      }
    };
    fetchMovie();
  }, []);

  return (
    <div className="new-movie-stage">
      <HeadContainer msg="Phim Mới Cập Nhật" class="" />
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={4}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        loop
        className="new-movie-container"
      >
        {loading
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
          : movies
              .filter((_, index) => index < 5)
              .map((Obj) => (
                <SwiperSlide key={Obj.movie._id} className="new-movie-card-wrapper">
                  <div
                    title={Obj.movie.name}
                    className="movie-card new-movie-card"
                    style={{ backgroundImage: `url(${Obj.movie.poster_url})` }}
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
