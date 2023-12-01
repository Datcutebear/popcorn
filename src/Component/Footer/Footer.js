import React from 'react'
import './Footer.css'
import logo from '../../assets/images/logo.png'

const Footer = () => {
  return (
     <div className="footer-container">
      <div id='footer'>
         <div className="container">
            <div className="col">
                <img src={logo} alt="logo-PopCorn" />
                <p><span>PopCorn</span>, tại đây bạn có thể <i>xem những bộ phim online</i> chất lượng cao miễn phí mà không gây phiền nhiễu về quảng cáo, chỉ cần bạn đến và tận hưởng <i>xem phim online</i>.</p>
                <p><span>Mail: </span><a href="mailto:popcorn@gmail.com">popcorn@gmail.com</a></p>
                <p>Disclaimer: copyrights and trademarks for the movies and tv series, and other promotional materials are held by their respective owners and their use is allowed under the fair use clause of the Copyright Law. All Series Videos are hosted on sharing website, and provided by 3rd parties not affiliated with this site or it's server.</p>
                <p><a href="#">xem phim</a>, <a href="#">xem phim lẻ</a></p>
            </div>
            <div className="col footer-item">
                <a href="#">Xemphimplus</a>
                <a href="#">PhimNhanh</a>
                <a href="#">hdonline</a>
                <a href="#">banhtv</a>
                <a href="#">phimbathu</a>
                <a href="#">BiluTV</a>
                <a href="#">Hài Tết</a>
                <a href="#">Harry Potter</a>
                <a href="#">siêu nhiên</a>
                <a href="#">phim tết</a>
                <a href="#">Thvl1</a>
                <a href="#">one piece</a>
                <a href="#">phim rạp việt nam</a>
                <a href="#">conan</a>
                <a href="#">pokemon</a>
                <a href="#">Todaytv</a>
                <a href="#">Phim Cấp 3</a>
                <a href="#">halloween</a>
                <a href="#">Giáng Sinh</a>
                <a href="#">doremon</a>
                <a href="#">doraemon</a>
                <a href="#">Thây Ma</a>
                <a href="#">Cương Thi</a>
                <a href="#">xác sống</a>
                <a href="#">naruto shippuuden</a>
                <a href="#">Dragon Ball</a>
                <a href="#">Vampire</a>
                <a href="#">siêu nhân</a>
                <a href="#">phimmoi</a>
                <a href="#">phimmoizz</a>
            </div>
        </div>
    </div>
    <div id="copy-right">
        <p>Copyright ©2022 Porcorn. All Rights Reserved.</p>
    </div>
     </div>
  )
}

export default Footer