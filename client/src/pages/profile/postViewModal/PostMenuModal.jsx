import React, { useEffect, useRef, useState } from 'react'
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/success.css";
import { Oval } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import useDeletingPost from '../../../store/deletingPost.store';

const PostMenuModal = ({ open, close, postId }) => {
    const deletingPost = useDeletingPost((state) => state.isDeleting);
    const setDeletingPost = useDeletingPost((state) => state.setIsDeleting);
    const dialog = useRef();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    });

    const deletePost = async () => {
        setDeletingPost(true)
       
    }

    return (
        <dialog ref={dialog} className='post-view-container'>
            <div className="post-menu post-view-content">
                <ul>
                    <li className='post-menu-delete-action'>
                        <Link onClick={deletePost}>
                            {deletingPost && <Oval
                                visible={true}
                                height="15"
                                width="15"
                                color="red"
                                ariaLabel="oval-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />}
                            <>{deletingPost ? "deleting..." : "delete"}</>
                        </Link>
                    </li>
                    <li className='post-menu-list-item'>
                        <Link>edit</Link>
                    </li>
                    <li className='post-menu-list-item'>
                        <Link onClick={close}>cancel</Link>
                    </li>
                </ul>
            </div>

        </dialog>
    )
}

export default PostMenuModal
