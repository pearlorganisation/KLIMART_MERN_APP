const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
  
    if (selectedImage) {
      setIsImageSelected(true);
  
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
  
      reader.readAsDataURL(selectedImage);
    } else {
      setIsImageSelected(false);
      setImagePreview(null); // Clear the image preview if no image is selected
    }
  };
  