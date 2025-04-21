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
