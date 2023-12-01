import React, { useState, useEffect, useContext } from "react";
import "./Comments.css";
import _ from "lodash";
import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";
import { getDatabase, ref, child, get,onValue, push, update, remove } from "firebase/database";
import "antd/dist/antd.css";
import { useParams } from "react-router";
// import { Modal, Button } from "antd";
import { userContext } from "../../App";
// import { useNavigate } from "react-router-dom";
// import Avatar from "@material-ui/core/Avatar";
const Comments = ({ movieId }) => {
  const { user, setUser } = useContext(userContext);
  const [listComments, setListComments] = useState([]);
  // const [messComment, setComment] = useState("");
  // const [messCommentChild, setCommentChild] = useState("")


  const users = {
    img: user.photoURL,
    name: user.displayName,
    email: user.email,
  };
  const { id } = useParams();

  useEffect(() => {
    const db = getDatabase();
    const connectedRef = ref(db, "comments");
    onValue(connectedRef, (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val();
        let listComments = [];
        for (let id in data) {
          listComments.push({
            id,
            message: data[id].message,
            avatar: data[id].avatar,
            username: data[id].username,
            createdAt: data[id].createdAt,
            movieId: data[id].movieId,
            parentId: data[id].parentId,
            userId: data[id].userId
          });
        }
        listComments = listComments.filter((item) => item.movieId == movieId);
        console.log(listComments);
        let listCommentsLocal = listComments.filter(item =>  item.parentId == '');
        listCommentsLocal.forEach(ele => {
          ele.listChild = [];
          const listChild = listComments.filter(comment => comment.parentId === ele.id)
          ele.listChild = [...listChild]
        })
        
        setListComments(listCommentsLocal);
      } else {
        console.log("not connected");
      }
    });
   
  }, [id]);
  
  const deleteComment= (commentId) => {
     if (window.confirm('Bạn có chắc muốn xóa bình luận này không?')){
       const db = ref(getDatabase())
       remove(child(db, '/comments/' + commentId)).then(()=>{
         //hien thi ok
         console.log(commentId)
         });
  
     }
}
  return (
    <div className="comment-container">
    <strong className="comment-total">{listComments.length} bình luận</strong>
    <hr/>
    <CommentForm placeHolderText="Thêm bình luận..." handleCancels={() => {}} handleLabel="Đăng"  /> 
    {
        listComments.map((item)=>(
            <Comment 
            key={item.id} 
            props={item}
            deleteComment={deleteComment}

            />
            
        ))
    }
</div>

  );
};

export default Comments;
