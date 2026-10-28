const IMAGEKIT_BASE_URL = "https://api.imagekit.io/v1/background-removal";

const buildImageKitAuth = () => {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is missing in environment variables.");
  }

  return `Basic ${Buffer.from(`${privateKey}:`).toString("base64")}`;
};

export const removeBackgroundFromImage = async (imageFile, fileName = "resume-image.png") => {
  try {
    if (!imageFile) {
      throw new Error("No image file provided for background removal.");
    }

    const formData = new FormData();

    if (typeof imageFile === "string") {
      const response = await fetch(imageFile);
      if (!response.ok) {
        throw new Error("Failed to fetch the image from the provided URL.");
      }

      const blob = await response.blob();
      formData.append("file", blob, fileName);
    } else {
      formData.append("file", imageFile, fileName);
    }

    formData.append("fileName", fileName);

    const response = await fetch(IMAGEKIT_BASE_URL, {
      method: "POST",
      headers: {
        Authorization: buildImageKitAuth(),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ImageKit background removal failed: ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("ImageKit background removal error:", error.message);
    throw error;
  }
};

export default { removeBackgroundFromImage };
