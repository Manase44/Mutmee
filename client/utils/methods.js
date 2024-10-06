import axios from "axios";
import { upload_preset, cloud_name } from "./configurations";

export const uploadImage = async (imageInput) => {
  const payload = new FormData();
  payload.append("file", imageInput);
  payload.append("upload_preset", upload_preset);
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
      payload,
    );

    if (response.statusText === "OK") {
      const secureUrl = response.data.secure_url;

      return {
        ok: true,
        message: secureUrl.replace("/upload", "/upload/w_400/f_auto/q_auto"),
      };
    }
  } catch (error) {
    if (error.message === "Network Error") {
      return {
        ok: false,
        message: "check your internet connection",
      };
    } else {
      return {
        ok: false,
        message: error,
      };
    }
  }
};
