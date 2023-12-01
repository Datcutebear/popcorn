import { Carousel } from "antd";
import { useState, useEffect } from "react";
import tmdbApi, { movieType } from "../../API/tmdbApi";
import apiConfig from "../../API/apiconfig";
import imdbLogo from "../../assets/images/IMDB_Logo.svg";
import { BrowserRouter as Link } from "react-router-dom";
import  category  from '../../API/tmdbApi'

function Banner(props) {
  const [slides, setSlides] = useState([]);
  const getData = async () => {
    const params = { page: 1 };
    try {
      const response = await tmdbApi.getMoviesList(movieType.popular, {
        params,
      });
      setSlides(response.results.slice(0, 5));
    } catch {
      console.log("error");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  function SlideItem({ slide }) {
    return (
      <div className="carousel-inner">
        <div className="carousel-item active" >
          <img
            src={apiConfig.originalImage(
              slide.backdrop_path || slide.poster_path
            )}
            className="d-block w-100 img-bg"
            alt="anh"
          />
          <div className="carousel-captions d-none d-md-block text-white">
            <span className="name">{slide.title}</span>
            <div className="date">Khởi chiếu: {slide.release_date}</div>
            <div className="meta">
              <img src={imdbLogo} alt="" />
              <span className="text"> {slide.vote_average}</span>
            </div>
            <div className="desc">{slide.overview}</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      
      <Carousel autoplay>
        {slides.map((slide, index) => (
          <div>
            <SlideItem key={index} slide={slide} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
export default Banner;
