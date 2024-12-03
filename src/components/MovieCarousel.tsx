import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { HeadContainer } from '../pages/Home';
import { MovieDetails } from '../services/types';

const MovieCarousel = (props: { data: MovieDetails[] }) => {

  // fix quả bug carousel khi mới load không chạy ( lỗi do chưa load data :D)
  if (!props.data || props.data.length === 0) {
    return null;
  }

  return (
    <div className="new-movie-stage">
      <HeadContainer msg="Phim Mới Cập Nhật" />
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={4}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, pauseOnMouseEnter: true, disableOnInteraction: false }}
        loop
        className="new-movie-container"
      >
        {props.data
          .filter((_, index) => index < 5)
          .map((Obj) => (
            <SwiperSlide key={Obj.movie._id} className="new-movie-card-wrapper">
              <div
                className="new-movie-card"
                style={{
                  backgroundImage: `url(${Obj.movie.poster_url})`,
                }}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};


export default MovieCarousel;
