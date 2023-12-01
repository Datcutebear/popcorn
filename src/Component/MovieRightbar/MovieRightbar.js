import React from 'react'
import './MovieRightbar.css'
import apiConfig from '../../API/apiconfig';
import { Link } from 'react-router-dom';
import { category } from '../../API/tmdbApi';
import './MovieRightbar.css';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const MovieRightbar = props => {
    const item = props.item;
    const link = "/"+category[props.category]+"/"+item.id;
    const posterImg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
    return (
        <Link to = {link} className="movie-container d-flex align-items-center justify-content-between">
            <div className="movie-info d-flex align-items-center">
                <img className="movie-poster" src={posterImg} alt="Poster"/>
                <div>
                     <h3 className="movie-name">{item.title || item.name}</h3>
                     <div className="movie-vote-count">Lượt đánh giá: {item.vote_count}</div>
                </div>
            </div>
            <ChevronRightIcon className="movie-next-icon"/>
        </Link>
    )
}

export default MovieRightbar