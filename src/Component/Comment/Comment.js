import { React, useState, useContext, useEffect } from "react";
import "./Comment.css";
import CommentForm from "../CommentForm/CommentForm";
import { getDatabase, ref, child, push, update } from "firebase/database";
import Avatar from "@material-ui/core/Avatar";
import { userContext } from "../../App";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Comment = ({
  props,
  // replies,
  currentUserEmail,
  deleteComment, 
  activeComment,
  addComment,
  parentId = null,
}) => {

  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === props.id;
  const replyId = parentId ? parentId : props.id;
  const { user, setUser } = useContext(userContext);
  const users = {
    img: user.photoURL,
    name: user.displayName,
    email: user.email,
  }
  const [reply, setReply] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editChildren, setEditChildren] = useState(false)
  useEffect(() => {
    setReply(false)
  }, [props])
  const replyComment = () => {
    setReply(true)
  };
  const editComment =() => {
    setEdit(true)
  }
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
    <div className="other-comment-container d-flex">
      <Avatar alt="Cindy Baker" src={props.avatar} className="comment-img" />
      <div className="other-comment-info d-flex flex-column">
        <p className="user-comment-name">{props.username}</p>
        {!edit && (
          <span className="user-comment-content">{props.message}</span>
        )}
        {
              edit && (
                 <CommentForm 
                 idComment={props.id}
                 placeHolderText="Chỉnh sửa bình luận..." 
                 handleLabel = "Cập nhật"
                 hasCancelButton = {true}
                  initialText={props.message}
                //  handleSubmit={(text) =>updateComment(text,props.id) }
                  handleCancels={() => setEdit(false)}
                 /> 
              )
           }
        <div>
          <button
            className="action-btn"
            onClick={() => {replyComment()}}
          >
            Phản hồi
          </button>
          {props.userId === user.uid && (
            <button
              className="action-btn"
              onClick={() =>{setEdit(true)}

              }
            >
              Chỉnh sửa
            </button>
          )}
          {props.userId === user.uid && (
            <button
              className="action-btn"
              onClick={() => deleteComment(props.id)}
            >
              Xóa
            </button>
          )}
          <span className="user-comment-time">{props.createdAt}</span>
        </div>
        <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Đăng nhập"
            cancelText = "Hủy"
        >
            <span>Bạn cần đăng nhập để sử dụng dịch vụ này!</span>
        </Modal>
        {
              reply && (
                 <CommentForm placeHolderText="Thêm phản hồi..." hasCancelButton= {false} handleCancels={() => {}} parentId={props.id} handleLabel="Phản hồi" /> 
              )
           }

        {props.listChild.length > 0 && (
          <div className="replies">
            {props.listChild.map((item) => (
              <div key = {item.id} className="other-comment-container d-flex children-form">
                <Avatar
                  alt="Cindy Baker"
                  src={item.avatar}
                  className="comment-img"
                />
                <div className="other-comment-info d-flex flex-column">
                  <p className="user-comment-name">{item.username}</p>
                  {/* <span className="user-comment-content">{props.message}</span> */}
                  {!isEditing && (
                    <span className="user-comment-content">{item.message}</span>
                  )}
                  <div>
                    <button
                      className="action-btn"
                      onClick={user.photoURL ? replyComment : showModal}
                    >
                      Phản hồi
                    </button>
                    {item.userId === user.uid && (
                      <button
                        className="action-btn"
                        onClick={ () => {setEditChildren(true)} 
                        }
                      >
                        Chỉnh sửa
                      </button>
                    )}
                    {item.userId === user.uid && (
                      <button
                        className="action-btn"
                        onClick={() => deleteComment(item.id)}
                      >
                        Xóa
                      </button>
                    )}
                    <span className="user-comment-time">{item.createdAt}</span>
                  </div>
                </div>
                {
                editChildren && (
                   <CommentForm 
                   idComment={item.id}
                   parentId={item.parentId}
                   placeHolderText="Chỉnh sửa bình luận..." 
                   handleLabel = "Cập nhật"
                   hasCancelButton = {true}
                    initialText={item.message}
                  //  handleSubmit={(text) =>updateComment(text,props.id) }
                    handleCancels={() => setEditChildren(false)}
                   /> 
                )
             }
              </div>
             
            ))}
              
          </div>
          
        )}
      </div>
    </div>
  );
};

export default Comment;
