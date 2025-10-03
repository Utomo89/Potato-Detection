 // Upload area functionality
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const previewContainer = document.getElementById('preview-container');
    const imagePreview = document.getElementById('image-preview');
    const removePreview = document.getElementById('remove-preview');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      
      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        handleFileSelect(e.dataTransfer.files[0]);
      }
    });
    
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length) {
        handleFileSelect(e.target.files[0]);
      }
    });
    
    function handleFileSelect(file) {
      if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          imagePreview.src = e.target.result;
          previewContainer.classList.remove('hidden');
          uploadArea.classList.add('hidden');
        };
        
        reader.readAsDataURL(file);
      } else {
        alert('Silakan pilih file gambar (JPG atau PNG)');
      }
    }
    
    removePreview.addEventListener('click', () => {
      fileInput.value = '';
      previewContainer.classList.add('hidden');
      uploadArea.classList.remove('hidden');
    });
    
    // Form validation
    function validateForm(event) {
      if (!fileInput.files.length) {
        alert('Silakan pilih gambar terlebih dahulu');
        return false;
      }
      
      const file = fileInput.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 5MB');
        return false;
      }
      
      // Show loading state
      const analyzeBtn = document.getElementById('analyze-btn');
      const originalText = analyzeBtn.innerHTML;
      analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Menganalisis...';
      analyzeBtn.disabled = true;
      
      // In a real application, the form would be submitted here
      // For demo purposes, we'll just reset after a delay
      setTimeout(() => {
        analyzeBtn.innerHTML = originalText;
        analyzeBtn.disabled = false;
      }, 2000);
      
      return true;
    }
    
    // Reset functionality
    function resetDetection() {
      const resultBox = document.getElementById('resultBox');
      if (resultBox) {
        resultBox.remove();
      }
      
      fileInput.value = '';
      previewContainer.classList.add('hidden');
      uploadArea.classList.remove('hidden');
    }

  document.querySelectorAll('.confidence-fill').forEach(el => {
  const conf = el.dataset.confidence;
  el.style.width = conf + "%";
});
