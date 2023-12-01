import React,{ useState, useEffect, useContext} from "react";
import "./MovieDetail.css";
import "./Responsive.css";
import { useParams } from "react-router";
import tmdbApi from "../../API/tmdbApi";
import apiConfig from "../../API/apiconfig";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PinterestIcon from "@material-ui/icons/Pinterest";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import imdbImg from "../../assets/images/IMDB_Logo.svg";
import Casts from "../Casts/Casts";
import MovieList from "../MovieList/MovieList";
import RightBarList from "../RightBar/RightBarList";
import Trailer from "../RightBar/Trailer";
import Comments from '../Comments/Comments'
import firebase from "../../Firebase/firebase";
import { userContext } from "../../App";

const MovieDetail = (props) => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(false);
  const {user,setUser} = useContext(userContext)

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
    setTrailerUrl(false);
  }, [category, id]);

  const handleViewMovie = () => {
    const getVideo = async () => {
      const response = await tmdbApi.getVideos(category,props.id);
      setTrailerUrl(response.results[0]);
    }
    getVideo()
    setTrailerUrl(true)
  }


  return (
    <div>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="watch-movie">
              {trailerUrl && <Trailer id = {item.id}/>}
          </div>
          
          <div className="movie-details-wrapper d-flex">
            <div className="right-bar">
              <RightBarList
                category={category}
                id={item.id}
                vote={item.vote_average}
                votecount={item.vote_count}
                name={item.title || item.name}
                poster={item.poster_path || item.backdrop_path}
              />
            </div>
            <div className="movie-details-left">
              <div className="movie-detail-content d-flex">
                <div className="movie-detail-poster">
                  <div
                    className="movie-poster-img"
                    style={{
                      backgroundImage: `url(${apiConfig.w500Image(
                        item.poster_path || item.backdrop_path
                      )})`,
                    }}
                  ></div>
                  <button
                    className="watch-movie-btn d-flex align-items-center justify-content-center"
                    onClick={() => handleViewMovie(item)}
                  >
                    <PlayArrowIcon className="watch-movie-btn-icon" />
                    Xem phim
                  </button>
                  <div className="vote-count text-center">
                    Lượt đánh giá: <span>{item.vote_count} votes</span>
                  </div>
                </div>
                <div className="movie-detail-info d-flex flex-column">
                  <h1 className="movie-title">{item.title || item.name}</h1>
                  <div className="movie-date">
                    Khởi chiếu: {item.release_date}
                  </div>
                  <ul className="social-media-list">
                    <li className="social-media-item">
                      <Link to="#" className="social-media-link d-flex align-items-center justify-content-center">
                        <FacebookIcon className="social-icon" />
                        Facebook
                      </Link>
                    </li>
                    <li className="social-media-item">
                      <Link to="#" className="social-media-link d-flex align-items-center justify-content-center">
                        <TwitterIcon className="social-icon" />
                        Twitter
                      </Link>
                    </li>
                    <li className="social-media-item">
                      <Link to="#" className="social-media-link d-flex align-items-center justify-content-center">
                        <WhatsAppIcon className="social-icon" />
                        WhatsApp
                      </Link>
                    </li>
                    <li className="social-media-item">
                      <Link to="#" className="social-media-link d-flex align-items-center justify-content-center">
                        <PinterestIcon className="social-icon" />
                        Pinterest
                      </Link>
                    </li>
                  </ul>
                  <p className="movie-text">
                    Xem {item.title || item.name} Phụ đề - Thuyết minh Full HD
                    tại Popcorn. Mời các bạn cùng theo dõi...
                  </p>
                  <div className="movie-imdb d-flex align-items-center">
                    <img className="movie-imdb-img" src={imdbImg} alt="" />
                    <span className="movie-imdb-point">
                      {item.vote_average}
                    </span>
                  </div>
                  <div className="movie-info-detail d-flex justify-content-between">
                    <div className="movie-info-left">
                      <div className="movie-info-left-title">
                        Đang phát:<span>Phụ đề</span>
                      </div>
                      <div className="movie-info-left-title">
                        Thể loại:
                        <div className="genres d-flex align-items-center flex-wrap">
                          {item.genres &&
                            item.genres.slice(0, 5).map((genre, index) => (
                              <span key={index} className="genres-item">
                                {genre.name}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="movie-info-right">
                      <div className="movie-info-left-title">
                        Thời lượng:
                        <span>
                          {item.runtime
                            ? `${item.runtime} phút`
                            : `Chưa cập nhật`}
                        </span>
                      </div>
                      <div className="movie-info-left-title">
                        Quốc gia:
                        <div className="countries d-flex align-items-center flex-wrap">
                          {item.production_countries.map((country, index) => (
                            <span key={index} className="country-item">
                              {country.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="movie-casts">
                    <p className="cast-heading">Diễn viên:</p>
                    <Casts id={item.id} />
                  </div>
                </div>
              </div>
              {/* {trailerUrl && <YouTube videoId={trailerUrl} id = {item.id} opts={opts} />} */}
              

              <div className="movie-overview container">
                <h2 className="heading">Nội dung {item.name || item.title}</h2>
                <div className="overview">{item.overview}</div>
                <div
                  className="background-img"
                  style={{
                    backgroundImage: `url(${apiConfig.originalImage(
                      item.backdrop_path || item.poster_path
                    )})`,
                  }}
                ></div>
              </div>
              <div className="movie-comment container">
                <h2 className="heading">
                  Bình luận về {item.name || item.title}
                </h2>
                <Comments movieId={id} />
              
              </div>
            </div>
          </div>
          <div className="movie-similar">
            <h2 className="heading">Phim cùng thể loại</h2>
            <MovieList category={category} type="similar" id={item.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
