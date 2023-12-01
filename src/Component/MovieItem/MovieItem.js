import React from 'react'
import './MovieItem.css'
import { Link } from 'react-router-dom';
import { category } from '../../API/tmdbApi'
import apiConfig from '../../API/apiconfig';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const MovieItem = props => {
  const item = props.item;
  const link = "/"+category[props.category]+"/"+item.id;
  const background = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  return (
    <Link to={link} className='col'>
        <div className='movie-item' style={{backgroundImage: `url(${background})`}}>
            <span className="quality">HD</span>
            <h3 className="movieTitle">{item.title || item.name}</h3>
            <button className="play-btn"><PlayArrowIcon className="play-icon" /></button>
        </div>
    </Link>
  )
}

export default MovieItem