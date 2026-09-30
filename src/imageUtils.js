export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = reader.result;
      const base64 = dataUrl.split(",")[1];
      resolve(base64);
    };

    reader.onerror = () => {
      reject(new Error("Unable to read this image. Please select it again."));
    };

    reader.readAsDataURL(file);
  });
}
