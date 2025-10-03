# Potato-Detection
# 🥔 AgriDetect - Sistem Deteksi Penyakit Daun Kentang

Proyek ini merupakan aplikasi berbasis **Flask** yang terintegrasi dengan model AI (Gradio) untuk mendeteksi penyakit pada daun kentang.  
Aplikasi menampilkan hasil analisis berupa **diagnosis penyakit**, **tingkat keyakinan (confidence)**, serta **rekomendasi perawatan**.

---

## 🚀 Fitur Utama
- Upload gambar daun kentang (PNG, JPG, JPEG).
- Analisis otomatis menggunakan model AI dari HuggingFace/Gradio.
- Menampilkan hasil diagnosis & confidence level dalam bentuk progress bar.
- Rekomendasi perawatan berdasarkan hasil diagnosis.
- Tampilan modern menggunakan **TailwindCSS**.

---

## 📂 Struktur Project
├── app.py # Main Flask App
├── templates/
│ └── index.html # Frontend (Jinja + Tailwind)
├── static/
│ ├── css/style.css # Custom CSS
│ └── js/reset.js # JS tambahan
├── requirements.txt # Dependency Python
└── README.md # Dokumentasi


---

## ⚙️ Instalasi

### 1. Clone Repository
git clone https://github.com/username/agridetect.git
cd agridetect

## Create a Virtual Environment (optional but recommended)
python -m venv venv
source venv/bin/activate   # Linux / MacOS
venv\Scripts\activate      # Windows

install dependencies
pip install -r requirements.txt

## run app 
python app.py

🖼️ Tampilan

Form upload gambar daun kentang.

Hasil analisis penyakit + confidence bar.

Rekomendasi perawatan sesuai hasil diagnosis.

📌 Catatan

Model AI diakses melalui Gradio Client (Prasetyo89/potato).

Pastikan koneksi internet aktif saat menjalankan aplikasi.

Jika ingin mengganti model, ubah bagian:

client = Client("Prasetyo89/potato")

