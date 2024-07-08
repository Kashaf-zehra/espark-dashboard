export const processImage = (upload) => {
  return new Promise((resolve, reject) => {
    let imageUrl = '';
    if (upload) {
      imageUrl = URL.createObjectURL(upload);
    } else {
      imageUrl = '/images/users/default-image.svg';
    }
    const imageElement = new Image();
    imageElement.src = imageUrl;
    imageElement.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 30;
      canvas.height = 30;
      const borderRadiusPercentage = 50;
      const borderRadius = (canvas.width * borderRadiusPercentage) / 100;
      context.beginPath();
      context.moveTo(borderRadius, 0);
      context.arcTo(canvas.width, 0, canvas.width, canvas.height, borderRadius);
      context.arcTo(
        canvas.width,
        canvas.height,
        0,
        canvas.height,
        borderRadius
      );
      context.arcTo(0, canvas.height, 0, 0, borderRadius);
      context.arcTo(0, 0, canvas.width, 0, borderRadius);
      context.closePath();
      context.clip();
      context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
      const resizedImageUrl = canvas.toDataURL();
      resolve(resizedImageUrl);
    };
    imageElement.onerror = (error) => {
      reject(error);
    };
  });
};
