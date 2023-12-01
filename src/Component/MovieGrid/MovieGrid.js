import React, { useState, useEffect } from 'react'
import './MovieGrid.css'
import tmdbApi, { category, movieType, tvType } from '../../API/tmdbApi'
import { useParams } from 'react-router'
import MovieItem from '../MovieItem/MovieItem'
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
const MovieGrid = props => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const { keyword } = useParams();
    const canPrev = page === 1;
    const canNext = page === totalPage;

    useEffect(() => {
        const getList = async () => {
            let response = null;
            if (keyword === undefined) {
                const params = {};
                switch (props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, { params });
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, { params });
                }
            }
            else {
                const params = {
                    query: keyword
                }
                response = await tmdbApi.search(props.category, { params }); 
            }

            setItems(response.results);
            setTotalPage(response.total_pages);
        }
        getList(); 


    }, [props.category, keyword])

    const prevPage = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page - 1
            };
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(props.type, { params });
                    break;
                default:
                    response = await tmdbApi.getTvList(props.type, { params });
                    break;
            }
        }
        else {
            const params = {
                page: page - 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, { params });
        }
        setItems(response.results);
        setPage(page - 1);
    }
    const nextPage = async () => {
        let response = null;
        if (keyword === undefined) {
            const params = {
                page: page + 1
            };
            switch (props.category) {
                case category.movie:
                    response = await tmdbApi.getMoviesList(props.type, { params });
                    break;
                default:
                    response = await tmdbApi.getTvList(props.type, { params });
                    break;
            }
        }
        else {
            const params = {
                page: page + 1,
                query: keyword
            }
            response = await tmdbApi.search(props.category, { params });
        }
        setItems(response.results);
        setPage(page + 1);
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [items])
    return (
        <div className="movie-grid container">
            <div id="movieGenreLink">
                <Link to="/">Trang chủ</Link>
                <span> / </span>
                <Link to="#">{props.type === 'top_rated' ? `Top IMDb` : props.category === category.movie ? `Phim lẻ` : `Phim bộ`}</Link>
                <span> / </span>
            </div>
            <div id="movieGenreList">
                <div class="listTitle">
                    {keyword == undefined ?
                        <h2>{props.type === 'top_rated' ? `Top IMDb` : props.category === category.movie ? `Phim lẻ` : `Phim bộ`}</h2> :
                        <h2>Kết quả tìm kiếm</h2>}
                </div>
                <div class="genreList">
                    {items.length > 0 ?
                        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
                            {
                                items.map((item, index) => (
                                    <MovieItem key={index} category={props.category} item={item} />
                                ))
                            }
                        </div> :
                        <div class="noti-text">Không có kết quả phù hợp.</div>}
                </div>

                <div id="genrePage">
                    <button onClick={prevPage} disabled={canPrev}>Trang trước</button>
                    <button onClick={nextPage} disabled={canNext}>Trang sau</button>
                </div>
            </div>
        </div>
    ) 
}

export default MovieGrid