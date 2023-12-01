import React from 'react'
import About from '../../Component/About/About'
import ContactForm from '../../Component/ContactForm/ContactForm'
import Footer from '../../Component/Footer/Footer'
import Header from '../../Component/LayoutHeader/Header'
import './Contact.css'
import banner from '../../assets/images/footer-bg.jpg'

const Contact = () => {
  return (
    <div>
        <Header category="movie"/>
        <div className="banner contact-banner" style={{backgroundImage: `url(${banner})`}}></div>
        <h1 className="contact-heading">TMovies - Trang web xem phim hay</h1>
        <div className="contact-container container d-flex justify-content-between">
            <About/>
            <ContactForm/>
        </div>
        <Footer/>
    </div>
  )
}

export default Contact