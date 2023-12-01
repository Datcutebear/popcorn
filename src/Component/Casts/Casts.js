import React from 'react'
import './Cast.css'
import { useParams } from 'react-router'
import tmdbApi from '../../API/tmdbApi'
import apiConfig from '../../API/apiconfig'
import { useEffect,useState } from 'react'

const Casts = props => {
    const {category} = useParams();
    const [casts,setCasts] = useState([]);
    useEffect(() => {
        const getList = async () => {
            const response = await tmdbApi.credits(category, props.id);
            setCasts(response.cast.slice(0,5));
        }
        getList();
    }, [category,props.id])
    return (
        <div className="casts">
             {
                 casts.map((item,index)=>(
                    <div className="cast-box d-flex flex-column align-items-center justify-content-around" key={index}>
                        <div className="cast-profile-img" style={{backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`}}></div>
                        <div className="cast-name">{item.name}</div>
                    </div>
                 ))
             }
        </div>
    )
}

export default Casts