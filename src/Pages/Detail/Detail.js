import React from 'react'
import Footer from '../../Component/Footer/Footer'
import MovieDetail from '../../Component/MovieDetail/MovieDetail'
import Header from '../../Component/LayoutHeader/Header'
import './Detail.css'
import ScrollToTop from '../../Component/ScrollToTop/ScrollToTop'


const Detail = () => {
    
  return (
    <div>
        <Header category="movie"/>
        <div className="movie-detail-container">
             <MovieDetail/>
        </div>
        <ScrollToTop/>
        <Footer/>
    </div>
  )
}

export default Detail