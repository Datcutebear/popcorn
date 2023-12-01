import React, { useState, useEffect, useContext } from "react";
import RightBar from "./RightBar";
import { category, movieType, tvType } from "../../API/tmdbApi";
import "./RightBar.css";
import StarIcon from "@material-ui/icons/Star";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Trailer from "./Trailer";
import { createBookmark } from "../../bookmarkData";
import firebase from "../../Firebase/firebase";
import { Modal, Button } from "antd";
import { userContext } from "../../App";
import { useNavigate } from 'react-router-dom';

const RightBarList = (props) => {
  const { user, setUser } = useContext(userContext);
  const [bookmarks, setBookmarks] = useState(() => {
    const bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
    return bookmarkList ?? [];
  });
  const [statusBtn, setStatusBtn] = useState(false);
  const addBookmark = (id, user, category, name, poster_path) => {
    id = props.id;
    user = firebase.auth().currentUser.email;
    category = props.category;
    name = props.name;
    poster_path = props.poster;
    createBookmark(id, user, category, name, poster_path).then((bookmark) => {
      setBookmarks([bookmark, ...bookmarks]);
    });
    setStatusBtn(true);
  };
  useEffect(() => {
    bookmarks.map((bookmark) => {
      if (bookmark.id === props.id && bookmark.user === user.email) {
        setStatusBtn(true);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  let navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    navigate("/login")
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <div className="vote-container ">
        <div className="vote-average">{props.vote}</div>
        <div className="vote-count-container d-flex flex-column">
          <div className="vote-icons">
            <StarIcon className="vote-icon" />
            <StarIcon className="vote-icon" />
            <StarIcon className="vote-icon" />
            <StarIcon className="vote-icon" />
            <StarIcon className="vote-icon" />
          </div>
          <div className="vote-count">{props.votecount} votes</div>
        </div>
      </div>

      {!statusBtn ? (
        <button
          className="bookmark-btn d-flex align-items-center justify-content-center"
          onClick={user.photoURL ? addBookmark : showModal}
        >
          <BookmarkBorderIcon className="bookmark-icon" /> Bookmark
        </button>
      ) : (
        <button className="bookmark-btn btn-clicked d-flex align-items-center justify-content-center">
          <BookmarkBorderIcon className="bookmark-icon" /> Bookmarked
        </button>
      )}
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Đăng nhập"
        cancelText = "Hủy"
      >
        <span>Bạn cần đăng nhập để sử dụng dịch vụ này!</span>
      </Modal>

      <Trailer id={props.id} />
      <div className="lists-rightbar">
        <div className="listTitle-rightbar">Phim lẻ xem nhiều</div>
        <RightBar category={category.movie} type={movieType.top_rated} />
      </div>
      <div className="lists-rightbar">
        <div className="listTitle-rightbar">Phim bộ xem nhiều</div>
        <RightBar category={category.tv} type={tvType.top_rated} />
      </div>
    </div>
  );
};

export default RightBarList;
