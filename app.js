// ===== Cloudinary Configuration =====
const CLOUD_NAME = "p3fvgont";
const UPLOAD_PRESET = "shifau_upload";
const PASSWORD = "SHIFAU";

// ===== Elements =====
const passwordInput = document.getElementById("password");
const unlockBtn = document.getElementById("unlockBtn");
const uploadArea = document.getElementById("uploadArea");
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("uploadBtn");
const progress = document.getElementById("progress");
const status = document.getElementById("status");

let unlocked = false;

// ===== Unlock =====
unlockBtn.addEventListener("click", () => {

    if (passwordInput.value.trim() === PASSWORD) {

        unlocked = true;
        uploadArea.classList.remove("locked");

        status.innerHTML = "✅ Upload unlocked";

    } else {

        status.innerHTML = "❌ Incorrect password";

    }

});

// ===== Upload =====
uploadBtn.addEventListener("click", async () => {

    if (!unlocked) {

        status.innerHTML = "🔒 Unlock first";
        return;

    }

    if (fileInput.files.length === 0) {

        status.innerHTML = "📁 Select a file first";
        return;

    }

    for (const file of fileInput.files) {

        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        progress.innerHTML = `Uploading ${file.name}...`;

        try {

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (data.secure_url) {

                status.innerHTML += `
                    <p>
                        ✅ ${file.name}<br>
                        <a href="${data.secure_url}" target="_blank">
                            Open File
                        </a>
                    </p>
                `;

            } else {

                status.innerHTML += `
                    <p>❌ Failed: ${file.name}</p>
                `;

            }

        } catch (error) {

            console.error(error);

            status.innerHTML += `
                <p>❌ Error uploading ${file.name}</p>
            `;

        }

    }

    progress.innerHTML = "🎉 Upload Complete";

});
