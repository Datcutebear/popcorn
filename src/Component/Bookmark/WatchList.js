import React,{useState,useEffect, useContext} from 'react'
import './WatchList.css'
import MovieItem from '../MovieItem/MovieItem';
import firebase from "../../Firebase/firebase";
import { deleteBookmark } from '../../bookmarkData';
import { userContext } from "../../App";

const WatchList = () => {
    const {user,setUser} = useContext(userContext)
    const [bookmarks,setBookmarks] = useState (()=>{
        const bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
        return (bookmarkList ?? []);
    });
    const deleteUserBookmark= (id) => {
        if (window.confirm('Bạn có chắc muốn xóa bộ phim này khỏi danh sách không?')){
            deleteBookmark().then(()=>{
                const updateBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
                setBookmarks(updateBookmarks);
            });
            
        }
    }
    useEffect(()=>{
        localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
      },[bookmarks]);
    const userBookmarks = bookmarks.filter(bookmark => bookmark.user === user.email);

    return (
        <div className="watchlist-container container">
            <div className="watchlist-heading">
                <h2 className="watchlist-title">Bookmark</h2>
                <span className="watchlist-desc">Bạn có thể lưu danh sách Phim Lẻ / Phim Bộ tại đây. Danh sách loạt phim được lưu trữ trong trình duyệt hiện tại của bạn.</span>
            </div>
            { userBookmarks.length>0 ?
                <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
                {
                    userBookmarks.map((item,index)=>(
                        <div className="col d-flex flex-column">
                           <MovieItem key={index} category={item.category} item={item}/>
                           <button className="delete-btn text-center" onClick={()=>deleteUserBookmark(item.id)}>Xóa</button>
                        </div>
                    ))
                }
                </div>
            :<span className="watchlist-desc text-center">YOU HAVE NO BOOKMARK, NOTHING TO SHOW</span>}
            
        </div>
    )
}

export default WatchList