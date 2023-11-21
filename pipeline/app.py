from flask import Flask, render_template, request, send_file
from PIL import Image
import io

app = Flask(__name__)

def compress_image(file, quality=20):
    img = Image.open(file.stream)
    img_io = io.BytesIO()
    img.save(img_io, 'JPEG', quality=quality, optimize=True)
    img_io.seek(0)
    return img_io

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return render_template('index.html', message='No file part')

        file = request.files['file']

        if file.filename == '':
            return render_template('index.html', message='No selected file')

        if file:
            compressed_img = compress_image(file)
            return send_file(compressed_img, attachment_filename='compressed_image.jpg', as_attachment=True)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
