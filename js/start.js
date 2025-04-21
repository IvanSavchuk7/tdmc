document.addEventListener("DOMContentLoaded", function () {
    const iframe = document.getElementById("video-frame");
    const playOverlay = document.querySelector(".video-container .play");
    const playBtn = document.querySelector(".play-btn");

    function playVideo() {
        // Start YouTube video
        iframe.contentWindow.postMessage(
            JSON.stringify({
                event: "command",
                func: "playVideo",
                args: []
            }),
            "*"
        );

        iframe.classList.add("normal-size");
        setTimeout(() => {
            playOverlay.style.display = "none";
        }, 200);

        if (window.innerWidth > 640) {
            document.getElementById("video-target").scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

    }

    playOverlay.addEventListener("click", playVideo);
    playBtn.addEventListener("click", function (e) {
        e.preventDefault();
        playVideo();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("waitlist-form");

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
                        window.location.href = "https://ivansavchuk7.github.io/tdmc/start/complete/";
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


