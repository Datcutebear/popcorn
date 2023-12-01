import React from 'react'
import './SearchMovie.css'
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import HeadlessTippy from "@tippyjs/react/headless";

import Popper from "../Popper/Popper";
import FilmItem from "../FilmItem/FilmItem";
import { CloseOutlined} from '@ant-design/icons';
import { LoadingOutlined} from '@ant-design/icons';

import tmdbApi, { category, movieType, tvType } from '../../API/tmdbApi'
import { Link } from 'react-router-dom';
import useDebounce from '../../Hooks/useDebounce';


export const SearchMovie = props => {
    const [searchResult, setSearchReult] = useState([]) //kq tìm kiếm
    const inputRef = useRef()
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)
    const debounce = useDebounce(keyword, 500)

    useEffect(() => {
        if(!debounce.trim()) { // nếu mà k có keyword thì thoát cái hàm trong keyword
            setSearchReult([]) //khi k có thì xóa luôn searchResult
            return;
        }
        setLoading(true)
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
                response = await tmdbApi.search(props.category, {params}); //tmdbApi.search trả về 1 promise
            }
            setLoading(false)
            setSearchReult(response.results.slice(0, 5))// nhận response khi nào mà await(chờ) xong thì chạy 
        }
        getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.category, debounce]) // deps keyword: mỗi khi ng dùng gõ thì keyword thay đổi và gọi api luôn

    const navigate = useNavigate();
    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                navigate(`/${category[props.category]}/search/${keyword}`);
                
            }
        },
        
        [keyword, navigate], 
    );
    useEffect(() => {
        const eventEnter = (e) => {
            e.preventDefault();
            if (e.keyCode == 13) goToSearch();
          
        }
        document.addEventListener('keyup', eventEnter);
        return () => {
            document.removeEventListener('keyup', eventEnter);
         
        }
    }, [keyword, goToSearch]);
    
    const handleHideResult = () => {
        setShowResult(false)
    }
   useEffect(() => {
        setShowResult(false)
    }, [])
    const link = `/${category[props.category]}/search/${keyword}` 
    return (
        <HeadlessTippy 
        interactive
          visible = {showResult && searchResult.length > 0}
          render={(attrs) => (
            <div className = "search-result" tabIndex= "-1" {...attrs} >
              <Popper>
                {searchResult.map((results, index) => (
                  <FilmItem key={index} results={results} category={props.category} />
                ))}
                
                <li className='view-all-results'>
                    <Link to = {link} onClick = {() =>   setShowResult(false)}
                        >
                    View All Results
                    </Link>
                </li>
              </Popper>
            </div>
          )}
          onClickOutside = {handleHideResult}
        >
            <div className='searchmovie'>
            <div className='container'>
                <div className='addcontent'>
                        <input
                            ref = {inputRef} 
                            type='text'
                            className='search_input'
                            placeholder='Tìm kiếm'
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onFocus = {() => setShowResult(true)}
                        >
                        </input>
                        {
                            !!keyword && !loading && (
                                <CloseOutlined className='icon-close' onClick={() => {
                                    setKeyword("")
                                    setSearchReult([])
                                    inputRef.current.focus()
                                }} />
                            )
                        }
                        {
                           loading && <LoadingOutlined className='icon-loading'/>
                        }
                        
                </div>
            </div>
        </div>
        </HeadlessTippy>

        
    )
}
