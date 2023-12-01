

import './FilmItem.css'
import apiConfig from '../../API/apiconfig';
import { category } from '../../API/tmdbApi'

import { Link } from 'react-router-dom';
function FilmItem(props) {
    let item = props.results
    const link = "/"+category[props.category]+"/"+item.id;
    return (
        <div>
            <Link to = {link}>
            <ul>
                <li className='search-link'>
                    <div className='search-item'>
                        <div className = "poster-thumbnail">
                            <img className = "poster-film"  
                            src={apiConfig.originalImage(
                                item.backdrop_path || item.poster_path
                            )}
                            alt='phim'   />
                        </div>
                        <div className='poster-title'>
                            <span className='poster-name'>{item.title}</span>
                            <div className='post-meta'>
                                <span className='quality'>HD</span>
                                <span className='text'>IMDb: {item.vote_average}</span>
                                <span>Release: {item.release_date}</span>
                            </div>
                        </div>
                    </div>
                  
                </li>
            </ul>
            
            </Link>
        </div>

    )
}
export default FilmItem