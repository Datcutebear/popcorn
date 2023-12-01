import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router'
import tmdbApi from '../../API/tmdbApi'
import Video from '../Video/Video';

const Trailer = props => {
    const [videos, setVideos] = useState({});
    const {category} = useParams();
    useEffect(() => {
        const getVideo = async () => {
            const response = await tmdbApi.getVideos(category,props.id);
            console.log(response)
            setVideos(response.results[0]);
        }
        getVideo();
    }, [category,props.id])
    return (
        videos!=null && (
            <div className="trailer-container">
                <Video item={videos}/>
            </div>
        )
    )
}

export default Trailer