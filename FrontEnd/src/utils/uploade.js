const CLOUD_NAME = "dd46zneoc";
const UPLOAD_PRESET = "cars_upload";

export const uploadImages = async (files) => {

  const uploadPromises = files.map((file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    return fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    ).then(res => res.json());
  });

  const results = await Promise.all(uploadPromises);

  const urls = results
    .filter(img => img.secure_url)
    .map(img => img.secure_url);

  return urls;
};