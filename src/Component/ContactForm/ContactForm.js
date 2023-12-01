import React, { useState , useEffect} from 'react'
import './ContactForm.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import emailjs from "emailjs-com"

const ContactForm = () => {

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_oap1zxo','template_57tk8wp',e.target,'orR2PH2pv_5rpWMl_').then(res=>{
            console.log(res);
            [... document.querySelectorAll(".contact-input")].map(index => index.value = "");
            document.querySelector(".contact-textarea").value="";
            document.querySelector(".alert-info").classList.add("active");
            setTimeout(() => {
                document.querySelector(".alert-info").classList.remove("active")
            }, 3000)
        }).catch(err=>{
            document.querySelector(".alert-danger").classList.add("active");
            setTimeout(() => {
                document.querySelector(".alert-danger").classList.remove("active")
            }, 3000)
            console.log(err);
        });
    }

    return (
        <div className="contact-form-container">
            <h3 className="contact-heading-h3">Nếu bạn có bất cứ vấn đề gì</h3>
            <h2 className="contact-heading-h1">Liên hệ với chúng tôi qua Email!</h2>
            <form className="contact-form d-flex flex-column" onSubmit={sendEmail}>
                <input type="text" name="name" className="contact-input" placeholder="Họ tên"  required/>
                <input type="email" name="user_email" className="contact-input" placeholder="Địa chỉ email" required/>
                <select  defaultValue="role" name= "role" className="w-full py-2">
                    <option value="role" disabled>Choose Role</option>
                    <option value="frontEnd" className="py-1">Front End</option>
                    <option value="backEnd" className="py-1">Back End</option>
                    <option value="qa" className="py-1">QA</option>
                </select>
                <textarea name="message" className="contact-textarea" rows="5" placeholder="Lời nhắn của bạn" required></textarea>
                <button className="contact-btn d-flex align-items-center"><MailOutlineIcon className="mail-icon"/>Gửi email</button>
            </form>
        
                    <div className="alert alert-info" role="alert">
                        Đã gửi email thành công!
                    </div>
            <div className="alert alert-danger" role="alert">
                 Có lỗi xảy ra! Vui lòng kiểm tra lại!
            </div>
        </div>

        
    )
}

export default ContactForm