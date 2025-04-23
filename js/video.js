document.addEventListener("DOMContentLoaded", function () {
    const iframe = document.getElementById("video-frame");

    if (!iframe || typeof Vimeo === "undefined") {
        console.error("❌ Vimeo iframe or player script not found.");
        return;
    }

    const player = new Vimeo.Player(iframe);

    const playOverlay = document.querySelector(".video-container .play");
    const playBtn = document.querySelector(".offer-btn");

    function playVideo() {
        player.play().then(() => {
            // Add animation or class
            iframe.classList.add("normal-size");

            // Hide overlay after short delay
            setTimeout(() => {
                if (playOverlay) playOverlay.style.display = "none";
            }, 200);

            // Smooth scroll to center on desktop
            if (window.innerWidth > 640) {
                document.getElementById("video-target").scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        }).catch((error) => {
            console.error("Vimeo play failed:", error);
        });
    }

    if (playOverlay) {
        playOverlay.addEventListener("click", playVideo);
    }

    if (playBtn) {
        playBtn.addEventListener("click", function (e) {
            e.preventDefault();
            playVideo();
        });
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("masterclass-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const submitBtn = document.getElementById("submit-btn");
        submitBtn.disabled = true; //
        const arrowDiv = submitBtn.querySelector(".arrow img");
        const loader = submitBtn.querySelector(".dot-spinner");
        const arrowOuter = submitBtn.querySelector(".arrow");
        arrowDiv.style.display = "none";
        arrowOuter.style.display = "none";
        submitBtn.childNodes[submitBtn.childNodes.length - 1].textContent = "";
        loader.style.display = "block";

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbx577BpBcdMzzas2pBQp0Wybtf3xfrz3OKfi0a_0K2X0wi8mE-2xC6Lcy9TteyTikJG/exec", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success") {
                    const submitBtn = document.getElementById("submit-btn");
                    submitBtn.style.display = "flex";
                    submitBtn.style.alignItems = "center";
                    submitBtn.style.justifyContent = "center";
                    arrowOuter.style.display = "block";
                    arrowOuter.style.background = "none";

                    arrowDiv.style.display = "block";
                    loader.style.display = "none";
                    arrowDiv.src = "../assets/images/checkmark.svg"; // ✅ Your checkmark icon
                    arrowOuter.style.background = "none";
                    setTimeout(() => {
                        window.location.href = "../video/join/";
                    }, 500);
                    submitBtn.classList.add("submitted");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Something went wrong. Please try again later.");
            });
    });
});


