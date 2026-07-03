<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const analytics = getAnalytics(app);
</script>
