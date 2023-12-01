import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about-container">
        <h2 className="about-heading">Về chúng tôi</h2>
        <div className="about-content">
            Popcorn là website chia sẻ thông tin các bộ phim mới thông qua nhiều nguồn khác nhau từ 
            các thành viên trên diễn đàn. Website được thành lập với mục đích mang đến kênh giải trí, 
            trao đổi cho những thành viên yêu thích phim ảnh và nghệ thuật.
    ‍        <br/>
            Chúng tôi sẽ cố gắng mang đến những thông tin review phim mới cập nhật liên tục, để bạn 
            không bỏ lỡ các chi tiết nóng hổi nào.
        </div>
        <h2 className="about-heading">Bản quyền</h2>
        <h3 className="about-title">1. Trách nhiệm nội dung</h3>
        <div className="about-content">
            Chúng tôi không lưu trữ và upload phim lên hệ thống, không có ngoại lệ cho bất cứ danh mục nào.
        </div>
        <h3 className="about-title">2. Bản quyền</h3>
        <div className="about-content">
            Chúng tôi không chịu trách nhiệm bản quyền của các nội dung được phát qua link chia sẻ (Youtube, 
            Dailymotion, Abyss...), nếu có bất cứ vi phạm nào về bản quyền mà bạn là người sở hữu bản quyền 
            đó, hãy liên hệ ngay với chúng tôi qua email popcorn@gmail.com . Sau khi xác minh tính xác 
            thực của thông tin mà bạn cung cấp, chúng tôi sẽ gỡ bỏ nội dung vi phạm khỏi website trong vòng 24h.
        </div>
    </div>
  )
}

export default About