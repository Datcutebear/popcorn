import React,{ useState,useEffect}  from 'react'
import MovieItem from '../MovieItem/MovieItem'
import './MovieList.css'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import tmdbApi, {category} from '../../API/tmdbApi';

const MovieList = props => {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        const getList = async ()=>{
             const params = {};
             let response = null;
             if (props.type !== 'similar'){
                 switch(props.category){
                     case category.movie: {
                         response = await tmdbApi.getMoviesList(props.type,{params});
                         break;
                     }
                     default: {
                         response = await tmdbApi.getTvList(props.type,{params});
                         break;
                     }
                 }
             }
             else {
                 response = await tmdbApi.similar(props.category, props.id);
             }
             setItems(response.results);
        }
        getList();
    }, [])
  return (
    <div>
        <div className="movieList">
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
                {
                    items.slice(0,10).map((item,index) => (
                        <MovieItem key={index} category={props.category} item={item}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default MovieList
