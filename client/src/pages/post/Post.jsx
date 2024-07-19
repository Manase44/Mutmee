import './Post.css'
import { useEffect, useState } from "react";
import { cloud_name, upload_preset } from "../../../utils/configurations";
import axios from 'axios';
import { FaPhotoVideo } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {useFormik} from 'formik';



const Post = () => {
  const [imageInput, setImageInput] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrlGenerated, setImageUrlGenerated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUploadImage = async () => {
    const payload = new FormData();
    payload.append("file", imageInput)
    payload.append("upload_preset", upload_preset)
    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`, payload)

      if (response.statusText === "OK") {
        setError(null)

        const secureUrl = response.data.secure_url;
        setImageUrl(secureUrl.replace("/upload", "/upload/w_400/f_auto/q_auto"))
        setImageInput(null)
      }
    } catch (error) {
      setError("uploading failed")
    }
  }

  const handlePostForm = useFormik({
    initialValues:{
      posterId:"",
      imageUrl:"",
      caption:"",
    }, 
    onSubmit: (data) => {
      data.imageUrl = imageUrl;
      // data.posterId = userId,
      console.log(data)
    }
  })

  return (
    <div className="post-container">
      <div className='upload-post-card'>
        <div className="post-card-header">
          {imageUrl ? <div className='post-header-cta'>
            <h3>create new post</h3>
            <Link>next</Link>
          </div> :<h3>create new post</h3>}
        </div>
        <div className='media-preview'>
          
          {imageInput ? <div className='image-preview-text'>
            <p>click <strong>ok</strong> to upload:</p>
            <p>{imageInput.name}</p>
          </div> : imageUrl ? <img src={imageUrl} alt="choosen media" /> : <FaPhotoVideo />}

        </div>
        {imageUrl ? 

        <div className='caption-container'>
          <div className="caption-container-header">
            <h4>caption:</h4>
          </div>
          <form onSubmit={handlePostForm.handleSubmit}>
            <div className='caption-input'>
              <textarea name="caption" id="caption" rows={2} value={handlePostForm.values.caption} onChange={handlePostForm.handleChange}></textarea>
            </div>
            <button type='submit'>post</button>
          </form>

        </div>

        :<div className="media-input">
          <div className="media-input-cta">
            <div className="illusion-button">choose media</div>
            <input type="file" name="image" id="image" accept="image/*,video/*" onChange={(e) => { setImageInput(e.target.files[0]) }} />
          </div>
          <button onClick={handleUploadImage} disabled={imageUrl}>ok</button>
        </div>}
      </div>

    </div>
  )
}

export default Post
