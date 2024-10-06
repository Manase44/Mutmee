import React from "react";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { server_url } from "../../../utils/configurations";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/success.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadImage } from "../../../utils/methods";
import { object, string } from "yup";

const PostArticle = () => {
  const [imageInput, setImageInput] = useState(null);
  const [articleContent, setArticleContent] = useState(null);
  const [articleError, setArticleError] = useState(null);
  const [imageUrlGenerating, setImageUrlGenerating] = useState(false);

  const validate = object({
    articleTitle: string().required("You need to provide a title"),
  });

  const submitArticle = async (data) => {
    try {
      const response = await axios.post(`${server_url}/article`, data, {
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
      setArticleError(error.response.data.message);
    } finally {
      setImageInput(null);
      setArticleContent(null);
      setArticleError(null);
      setImageUrlGenerating(false);
    }
  };

  const handleArticleForm = useFormik({
    initialValues: {
      articleTitle: "",
      articleImageUrl: "",
      articleContent: "",
    },
    validationSchema: validate,
    onSubmit: async (data) => {
      if (imageInput && articleContent) {
        setImageUrlGenerating(true);
        setArticleError(null);
        const response = await uploadImage(imageInput);

        if (!response.ok) {
          setArticleError(response.message);
          setImageUrlGenerating(false);
          return;
        }
        if (response.ok) {
          data.articleImageUrl = response.message;
          data.articleContent = articleContent;
          console.log(data);
          submitArticle(data);
        }
      } else {
        setArticleError("Please provide all fields");
      }
    },
  });

  return (
    <div>
      <form onSubmit={handleArticleForm.handleSubmit}>
        <div className="form-input">
          <label htmlFor="articleTitle">title</label>
          <div className="input-wrapper">
            <input
              type="text"
              style={{ width: "100%" }}
              name="articleTitle"
              id="articleTitle"
              onBlur={handleArticleForm.handleBlur}
              onChange={handleArticleForm.handleChange}
              value={handleArticleForm.values.articleTitle}
            />
          </div>
          {handleArticleForm.errors.articleTitle &&
            handleArticleForm.touched.articleTitle && (
              <p className="error">{handleArticleForm.errors.articleTitle}</p>
            )}
        </div>

        <div className="media-input-cta">
          <div className="illusion-button">choose media</div>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => {
              setImageInput(e.target.files[0]);
            }}
          />
        </div>
        {imageInput && (
          <p className="article-image-input-name">{imageInput?.name}</p>
        )}
        <ReactQuill
          className="article-editor"
          theme="snow"
          value={articleContent}
          onChange={setArticleContent}
        />
        {articleError && <p className="error">{articleError}</p>}
        <button
          disabled={imageUrlGenerating}
          type="submit"
          className="post-ok-btn"
        >
          {imageUrlGenerating && (
            <Oval
              visible={true}
              height="15"
              width="15"
              color="#4fa94d"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
          {imageUrlGenerating ? "posting..." : "post"}
        </button>
      </form>
    </div>
  );
};

export default PostArticle;
