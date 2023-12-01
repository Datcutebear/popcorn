import React from 'react'
import Banner from '../../Component/Banner/Banner'
import Footer from '../../Component/Footer/Footer'
import MovieList from '../../Component/MovieList/MovieList'
import Note from '../../Component/Note/Note'
import Header from '../../Component/LayoutHeader/Header'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./Home.css"
import { category,movieType,tvType } from '../../API/tmdbApi'
import ScrollToTop from '../../Component/ScrollToTop/ScrollToTop'
import { Link } from 'react-router-dom'


const Home = () => {
 
   return (
    <div>
        <Header category="movie"/>
        <Banner/> 
        <div id="content">
           <div className="container">
              <Note/>
              <div className='lists'>
                   <div className="listTitle">
                      <h2>Phim sắp chiếu</h2>
                      <Link to="/list/movie/upcoming">Xem thêm</Link>
                   </div>
                   <MovieList category={category.movie} type={movieType.upcoming}/>
              </div>
              <div className='lists'>
                   <div className="listTitle">
                      <h2>Phim hot</h2>
                      <Link to="/list/movie/popular">Xem thêm</Link>
                   </div>
                   <MovieList category={category.movie} type={movieType.popular}/>
              </div>
              <div className='lists'>
                   <div className="listTitle">
                      <h2>Phim lẻ</h2>
                      <Link to="/list/movie/top_rated">Xem thêm</Link>
                   </div>
                   <MovieList category={category.movie} type={movieType.top_rated}/>
              </div>
              <div className='lists'>
                   <div className="listTitle">
                      <h2>Phim bộ</h2>
                      <Link to="/list/tv/popular">Xem thêm</Link>
                   </div>
                   <MovieList category={category.tv} type={tvType.popular}/>
              </div> 
              <ScrollToTop/>
           </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Home