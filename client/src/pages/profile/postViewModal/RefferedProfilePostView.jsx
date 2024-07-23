import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./PostViewModal.css";
import post from "../../../assets/profile.jpg";
import { MdOutlineClose } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { PiShareFatBold } from "react-icons/pi";
import { useFormik } from "formik";

const RefferedProfilePostView = ({ open, close, medialink, caption, comment }) => {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  });

  const postViewForm = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (data) => {
      console.log(data);
    },
  });

  return (
    <dialog ref={dialog} className="post-view-container">
      <div className="post-view-content">
        <div className="post-view-modal-media">
          <img src={medialink} alt="post media" />
        </div>
        <div className="post-view-modal-comment">
          <div className="post-view-modal-comment-header">
            <p>comments</p>
            <div className="post-view-modal-comment-header-cta">
              <Link onClick={close}>
                <MdOutlineClose />
              </Link>
            </div>
          </div>
          <div className="post-view-modal-comment-comments-section">
            {comment.length < 1 ? (
              <p>No comments yet!</p>
            ) : (
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
                <p>This is great broo!</p>
              </div>
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
            <button type="submit">comment</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default RefferedProfilePostView;
