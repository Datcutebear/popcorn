import React,{ useState,useEffect } from 'react'
import './RightBar.css'
import tmdbApi, {category} from '../../API/tmdbApi';
import MovieRightbar from '../MovieRightbar/MovieRightbar';

const RightBar = props => {
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
    },[])
  return (
      <div>
        <div className='rightbar'>
            <div className='col'>
            {
                 items.slice(0,10).map((item,index) => (
                    <MovieRightbar key={index} category={props.category} item={item}/>
                ))
            }
            </div>
        </div>
    </div>
    
  )
}

export default RightBar