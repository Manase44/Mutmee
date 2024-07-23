import {useEffect, useRef} from 'react';
import { MdOutlineClose } from "react-icons/md";

const ViewCoverImageModal = ({open, close, image}) => {

    const dialog = useRef();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    });

  return (
    <dialog ref={dialog} className='view-news-image-dialog' style={{border:"none"}}>
      <div className="view-news-image-body">
        <div className="view-news-image-body-header"><MdOutlineClose onClick={close}/></div>
        <div className="view-news-image-body-image-holder">
            <img src={image} alt="article cover image" />
        </div>
      </div>
    </dialog>
  )
}

export default ViewCoverImageModal
