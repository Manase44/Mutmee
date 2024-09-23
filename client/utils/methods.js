import axios from "axios";


export const uploadImage = async (imageInput, upload_preset, cloud_name) => {
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

          return secureUrl.replace("/upload", "/upload/w_400/f_auto/q_auto");
      }
    } catch (error) {
      return error;
    } 
}