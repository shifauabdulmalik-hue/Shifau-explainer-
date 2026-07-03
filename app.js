// 1. Firebase Config (replace later)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// 2. Init Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// 3. Elements
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const status = document.getElementById("status");

// 4. Upload Logic
uploadBtn.addEventListener("click", async () => {

  const files = fileInput.files;

  if (!files.length) {
    status.innerText = "❌ No files selected";
    return;
  }

  status.innerText = "Uploading... ⏳";

  for (let file of files) {

    const fileRef = storage.ref("uploads/" + Date.now() + "_" + file.name);

    await fileRef.put(file);

    const url = await fileRef.getDownloadURL();

    console.log("Uploaded:", url);
  }

  status.innerText = "✅ Upload complete!";
});
