import React, { useEffect, useRef, useState } from "react";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/success.css";
import "react-simple-toasts/dist/theme/failure.css";
import { Oval } from "react-loader-spinner";
import { Link } from "react-router-dom";
import useDeletingPost from "../../../store/deletingPost.store";
import useShowPost from "../../../store/showPost.store";
import useShoPostMenu from "../../../store/showPostMenu.store";
import axios from "axios";
import { server_url } from "../../../../utils/configurations";
import useDeletedAPostStore from "../../../store/deletedAPost.store";

const PostMenuModal = ({ open, close, postId }) => {
  const deletingPost = useDeletingPost((state) => state.isDeleting);
  const setDeletingPost = useDeletingPost((state) => state.setIsDeleting);
  const setShowPost = useShowPost((state) => state.setShowPost);
  const setShowPostMenu = useShoPostMenu((state) => state.setShowPostMenu);
  const setDeletedPost = useDeletedAPostStore((state) => state.setPostDeleted);
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  });

  const deletePost = async () => {
    setDeletingPost(true);
    try {
      const response = await axios.delete(`${server_url}/post/${postId}`, {
        withCredentials: true,
      });
      if (response.data.ok) {
        toast(response.data.message, {
          theme: "success",
          duration: 4000,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
      toast(error.response.data.message, {
        theme: "failure",
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setShowPost(false);
      setShowPostMenu(false);
      setDeletingPost(false);
      setDeletedPost(true);
    }
  };

  return (
    <dialog ref={dialog} className="post-view-container">
      <div className="post-menu post-view-content">
        <ul>
          <li>
            <Link className="post-menu-delete-action" onClick={deletePost}>
              {deletingPost && (
                <Oval
                  visible={true}
                  height="15"
                  width="15"
                  color="red"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}
              <>{deletingPost ? "deleting..." : "delete"}</>
            </Link>
          </li>
          <li>
            <Link className="post-menu-list-item">edit</Link>
          </li>
          <li>
            <Link className="post-menu-list-item" onClick={close}>
              cancel
            </Link>
          </li>
        </ul>
      </div>
    </dialog>
  );
};

export default PostMenuModal;
