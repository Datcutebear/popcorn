import { useState, useEffect,useContext } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import logo from "../../assets/images/logo.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import firebase from "../../Firebase/firebase";
import { IconButton } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import "./Header.css";
import "antd/dist/antd.css";
import { SearchMovie } from "../SearchMovie/SearchMovie";
import { useParams } from 'react-router';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import Login from "../../Pages/Login/Login";
import { userContext } from "../../App";
import { useNavigate } from 'react-router-dom';



const Header = props => {
  const [checked, setChecked] = useState(true);
  const {user,setUser} = useContext(userContext)
  const { keyword } = useParams();
  const [showNav, setShowNav] = useState(false)
  

  let navigate = useNavigate();
  const signOut = () => {
    firebase.auth().signOut().then(function() {
      setUser({
        photoURL: null,
        displayName: null
      })
      localStorage.setItem('user', null)
      navigate("/login")
    }) 
    .catch(function() {
      console.log("Lỗi đăng xuất")
    })

  }
  const renderLogin = () => {
    return (
      <div className="more-nav">
      <Avatar
        className="more-info"
        onClick={() => { 
          setChecked(!checked);
          if (checked)
            document
              .getElementsByClassName("info")[0]
              .setAttribute("style", "display: block !important ");
          if (!checked)
            document
              .getElementsByClassName("info")[0]
              .removeAttribute("style");
        }}
      >
        <Avatar alt="Cindy Baker" src={user.photoURL} />
      </Avatar>
      <div className="info">
        <div className="info-user">
          <div className="inix">
            <Avatar alt="Cindy Baker" src={user.photoURL} />
          </div>
          <div className="text-user">
            <strong>{user.displayName}</strong>
          </div>
        </div>
        <div
          className="info-icon"
          onClick={() => signOut()}
        >
          <div className="inix">
            <IconButton>
              <ExitToAppIcon className="inix-icon" />
            </IconButton>
          </div>
          <strong className="logout-text">Đăng Xuất</strong>
        </div>
      </div>
    </div>
    )
     
  }

  return (
    <div id="warrper">
      <div className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <img src={logo} alt="" />
          </Link>
          <div className="header-container-navbar">
            <ul className="header-navbar" id={showNav ? "hidden" : ""}>
              <li>
                <Link to="#">THỂ LOẠI</Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/list/movie/popular">Phim Hành Động</Link>
                  </li>
                  <li>
                    <Link to="/list/movie/popular">Phim Tình Cảm </Link>
                  </li>
                  <li>
                    <Link to="/list/movie/popular">Phim Hài Hước</Link>
                  </li>
                  <li>
                    <Link to="/list/movie/popular">Phim Kinh Dị</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="#">QUỐC GIA</Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/list/movie/popular">Phim Hàn Quốc</Link>
                  </li>
                  <li>
                    <Link to="/list/movie/popular">Phim Mỹ </Link>
                  </li>
                  <li>
                    <Link to="/list/movie/popular">Phim Châu Âu</Link>
                  </li>
                  <li>
                    <Link to="/list/movie/popular">Phim Trung Quốc</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/list/movie/popular">PHIM LẺ</Link>
              </li>
              <li>
                <Link to="/list/tv/popular">PHIM BỘ</Link>
              </li>
              <li>
                <Link to="/list/movie/top_rated">TOP IMDb</Link>
              </li>
              <li>
                <Link to="/bookmark">BOOKMARK</Link>
              </li>
              <li>
                <Link to="/contact">LIÊN HỆ</Link>
              </li>
            </ul>
            <div className="navbar-btn" >
              <MenuIcon onClick={() => setShowNav(!showNav)} className="navbar-btn-icon" />
            </div>

            <div className="header-search">
              <SearchMovie category={props.category} keyword={keyword} />
            </div>
          </div>
  
          { 
            user.photoURL ? <div>{renderLogin()}</div> :
              <Link to="/login" className="login-user" >
                <img src="https://i.ibb.co/PCjW83Y/avt.png" alt="" />
                <span className="login__text">Đăng Nhập</span>
              </Link>
          }
        </div>
      </div>
    </div>
  );
}


export default Header;
