import React from 'react'
import Header from '../../Component/LayoutHeader/Header'
import Footer from '../../Component/Footer/Footer'
import WatchList from '../../Component/Bookmark/WatchList'
const Bookmark = () => {
  return (
    <div>
        <Header category="movie"/>
        <WatchList/>
        <Footer/>
    </div>
  )
}

export default Bookmark