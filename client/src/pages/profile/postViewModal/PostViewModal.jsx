import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./PostViewModal.css";
import { RxDotsHorizontal } from "react-icons/rx";
import post from "../../../assets/profile.jpg";
import { MdOutlineClose } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import { useFormik } from "formik";
import PostMenuModal from "./PostMenuModal";
import useDeletingPost from "../../../store/deletingPost.store";
import useShoPostMenu from "../../../store/showPostMenu.store";
import axios from "axios";
import { server_url } from "../../../../utils/configurations";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/success.css";

const PostViewModal = ({ open, close, id, medialink, caption, comments }) => {
  const setDeletingPost = useDeletingPost((state) => state.setIsDeleting);
  const showPostMenu = useShoPostMenu((state) => state.showPostMenu);
  const setShowPostMenu = useShoPostMenu((state) => state.setShowPostMenu);
  const dialog = useRef();
  const [loading, setLoading] = useState(false);
  const [postComments, setComments] = useState(comments);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  });

  const postComment = async (data) => {
    setLoading;
    try {
      const response = await axios.post(`${server_url}/post/comment`, data, {
        withCredentials: true,
      });
      console.log(response);
      if (response.data.ok) {
        toast(response.data.message, {
          theme: "success",
          duration: 4000,
          position: "top-right",
        });
        setError(null);
        setComments(response.data.comments);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const postViewForm = useFormik({
    initialValues: {
      postId: id,
      comment: "",
    },
    onSubmit: (data) => {
      console.log(data);
      postComment(data);
    },
  });

  return (
    <dialog ref={dialog} className="post-view-container">
      <div className="post-view-content">
        <div className="post-view-modal-media">
          <img src={medialink} alt="post media" />
        </div>
        <PostMenuModal
          open={showPostMenu}
          close={() => {
            setShowPostMenu(false);
            setDeletingPost(false);
          }}
          postId={id}
        />
        <div className="post-view-modal-comment">
          <div className="post-view-modal-comment-header">
            <p>comments</p>
            <div className="post-view-modal-comment-header-cta">
              <Link onClick={() => setShowPostMenu(true)}>
                <RxDotsHorizontal />
              </Link>
              <Link onClick={close}>
                <MdOutlineClose />
              </Link>
            </div>
          </div>
          <div className="post-view-modal-comment-comments-section">
            {postComments.length < 1 ? (
              <p>No comments yet!</p>
            ) : (
              postComments.map((eachComment, i) => (
                <div className="post-view-modal-comment-each">
                  <Link className="right-profile">
                    <div className="right-profile-image">
                      <img src={post} alt="suggested profile" />
                    </div>
                    <div className="right-profile-description">
                      <p className="right-profile-username">fikopersempre</p>
                      <span>10min</span>
                    </div>
                  </Link>
                  <p>{eachComment.text}</p>
                </div>
              ))
            )}
          </div>
          <div className="post-view-modal-comment-caption-section">
            <div className="home-post-cta">
              <ul>
                <li title="like">
                  <FaRegHeart />
                </li>
                <li title="comment">
                  <FaRegCommentDots />
                </li>
                <li title="share">
                  <PiShareFatBold />
                </li>
              </ul>
            </div>
            <div className="home-post-likes">
              <span>0</span>
              <p>likes</p>
            </div>
          </div>
          <p className="post-view-modal-comment-caption">{caption}</p>
          <form
            className="post-view-model-commenting-form"
            onSubmit={postViewForm.handleSubmit}
          >
            <div className="post-view-model-adding-comment-input">
              <input
                type="text"
                name="comment"
                id="comment"
                placeholder="add comment..."
                onChange={postViewForm.handleChange}
                value={postViewForm.values.comment}
              />
            </div>
            <button type="submit">{loading ? "comment..." : "comment"}</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </dialog>
  );
};

export default PostViewModal;
