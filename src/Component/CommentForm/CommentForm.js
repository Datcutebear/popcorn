import React, { useState, useContext } from "react";
import "./CommentForm.css";
import { useParams } from "react-router";
import { getDatabase, ref, child, push, update } from "firebase/database";
import firebase from "../../Firebase/firebase";
import Avatar from "@material-ui/core/Avatar";
import "antd/dist/antd.css";
import { userContext } from "../../App";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
const CommentForm = ({
  idComment,
  placeHolderText,
  handleLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancels,
  parentId,
}) => {
  const { user, setUser } = useContext(userContext);

  const users = {
    img: user.photoURL,
    name: user.displayName,
  };
  const { id } = useParams();
  const [text, setText] = useState(initialText);
  const isBtnDisabled = text.length === 0;
  const onSubmit = (event) => {
  
    const db = getDatabase();
    event.preventDefault();
    let comment = {
      avatar: "",
      createdAt: "",
      message: "",
      movieId: "",
      parentId: parentId || "",
      username: "",
      userId: null
    };
    comment.avatar = users.img;
    comment.username = users.name;
    const d = new Date().toLocaleString();
    comment.createdAt = d;
    comment.message = text;
    comment.movieId = id;
    comment.userId = user.uid;
    let newPostKey = null;
    if (hasCancelButton) {
      newPostKey = idComment;
    } else {
      newPostKey = push(child(ref(db), "comments")).key;
    }
    const updates = {};
    if(user.photoURL) {
      updates["/comments/" + newPostKey] = comment
      setText("");
      handleCancels();
      return update(ref(db), updates);

    }
    else {
      showModal()
    }
  };
  let navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="comment-box d-flex">
      {!hasCancelButton && (
        <Avatar alt="Cindy Baker" src={users.img} className="comment-img" />
      )}
      <form
        className="comment-input-container d-flex flex-column"
        onSubmit={onSubmit }
      >
        <textarea
          value={text}
          placeholder={placeHolderText}
          onChange={(e) => setText(e.target.value)}
          className="comment-input"
        ></textarea>
        <div className="comment-btn d-flex justify-content-end">
          <button className="submit-btn" disabled={isBtnDisabled}>
            {handleLabel}
          </button>
          {hasCancelButton && (
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancels}
            >
              Hủy
            </button>
          )}
        </div>
      </form>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Đăng nhập"
        cancelText="Hủy"
      >
        <span>Bạn cần đăng nhập để sử dụng dịch vụ này!</span>
      </Modal>
    </div>
  );
};

export default CommentForm;
