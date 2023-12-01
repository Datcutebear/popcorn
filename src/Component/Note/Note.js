import React from 'react'
import './Note.css'
import RssFeedIcon from '@material-ui/icons/RssFeed';

const Note = () => {
  return (
    <div className='note'>
         <div>
            <RssFeedIcon className="wifi-icon"/>
         </div>
         <div>
            <h1>Popcorn</h1>
            <p>Nếu web/videos load chậm, <a href="https://1.1.1.1/">TẢI NGAY ứng dụng VPN (1.1.1.1) tại đây</a> để cải thiện tốc độ</p>
         </div>
    </div>
  )
}

export default Note