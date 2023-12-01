import React from 'react'
import Headers from '../../Component/LayoutHeader/Header'
import Footer from '../../Component/Footer/Footer'
import MovieGrid from '../../Component/MovieGrid/MovieGrid'
import { useParams } from 'react-router'
import ScrollToTop from '../../Component/ScrollToTop/ScrollToTop'

const Catelog = () => {
    const {category,type} = useParams();
    return (
        <div>
            <Headers category = {category}/>
            <MovieGrid category = {category} type = {type}/>
            <ScrollToTop/>
            <Footer/>
        </div>
    )
}

export default Catelog