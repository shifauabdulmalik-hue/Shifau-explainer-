<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
  import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
  } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDEKq-V5yiiZlnkFAm509PaOjEQ2O-uae0",
    authDomain: "shifau-explainer.firebaseapp.com",
    projectId: "shifau-explainer",
    storageBucket: "shifau-explainer.firebasestorage.app",
    messagingSenderId: "95376583442",
    appId: "1:95376583442:web:b8c2b06a872477a2a9a1cb",
    measurementId: "G-8PZHL6XRXS"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  // Get page elements
  const fileInput = document.getElementById("fileInput");
  const uploadBtn = document.getElementById("uploadBtn");
  const status = document.getElementById("status");

  uploadBtn.addEventListener("click", () => {
    const files = fileInput.files;

    if (files.length === 0) {
      status.textContent = "Please select a file.";
      return;
    }

    Array.from(files).forEach(file => {
      const storageRef = ref(storage, "uploads/" + Date.now() + "_" + file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          status.textContent = `Uploading... ${progress}%`;
        },
        (error) => {
          status.textContent = "❌ Upload failed.";
          console.error(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          status.innerHTML = `✅ Upload complete!<br><a href="${downloadURL}" target="_blank">Open uploaded file</a>`;
          console.log(downloadURL);
        }
      );
    });
  });
</script>
