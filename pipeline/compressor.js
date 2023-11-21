function compressImage() {
    const input = document.getElementById('inputImage');
    const output = document.getElementById('outputImage');
    const downloadLink = document.getElementById('downloadLink');
  
    const file = input.files[0];
    const reader = new FileReader();
  
    reader.onload = function(event) {
      const img = new Image();
      img.src = event.target.result;
  
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
  
        ctx.drawImage(img, 0, 0);
  
        canvas.toBlob(function(blob) {
          const compressedImage = URL.createObjectURL(blob);
          output.src = compressedImage;
          output.style.display = 'block';
          downloadLink.href = compressedImage;
          downloadLink.style.display = 'block';
        }, 'image/jpeg', 0.5); // Adjust compression quality here (0.5 means 50% quality)
      };
    };
  
    reader.readAsDataURL(file);
  }
  