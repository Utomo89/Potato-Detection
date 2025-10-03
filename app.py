from flask import Flask, render_template, request
from gradio_client import Client, handle_file
import base64
from io import BytesIO
from PIL import Image
import tempfile
import os

app = Flask(__name__)

# Client Gradio
client = Client("Prasetyo89/potato")

@app.route('/', methods=['GET', 'POST'])
def index():
    prediction = None
    confidence = None
    image_data = None
    warning_message = None

    if request.method == 'POST':
        file = request.files['image']
        if file:
            # Simpan untuk preview
            img = Image.open(file.stream).convert("RGB")
            preview_img = img.copy()

            # Simpan ke file sementara (untuk handle_file)
            with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as tmp:
                img.save(tmp, format="PNG")
                tmp_path = tmp.name

            # Kirim ke API Gradio
            result = client.predict(
                img=handle_file(tmp_path),
                api_name="/predict"
            )

            # Debug: lihat hasil dari API
            print("DEBUG Result:", result)

            # Hapus file sementara
            os.remove(tmp_path)

            # Misal result return dict {"label": "Early Blight", "confidence": 0.85}
            if isinstance(result, dict):
                prediction = result.get("label")

                conf_value = result.get("confidence", 0)
                try:
                    confidence = float(conf_value) * 100
                except (ValueError, TypeError):
                    confidence = 0  # default jika tidak bisa dikonversi

                if confidence < 70:
                    warning_message = "⚠️ Gambar yang Anda upload mungkin bukan daun kentang atau tidak relevan."
            else:
                # Jika API mengembalikan format list/tuple
                prediction = result[0]
                try:
                    confidence = float(result[1]) * 100
                except (ValueError, TypeError):
                    confidence = 0

            # Gambar preview → base64 string
            buffered = BytesIO()
            preview_img.save(buffered, format="PNG")
            image_data = base64.b64encode(buffered.getvalue()).decode("utf-8")

    return render_template(
        'index.html',
        prediction=prediction,
        confidence=confidence,
        image_data=image_data,
        warning_message=warning_message
    )

if __name__ == '__main__':
    app.run(debug=True)
