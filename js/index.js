var swiper1 = new Swiper(".feedback-swiper", {
    slidesPerView: 1,
    lazy: true,
    autoHeight: false,
    spaceBetween: 20,
    centeredSlides: true,
    direction: 'horizontal',
    loop: true,


    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
const input = document.querySelector("#phone");

const iti = window.intlTelInput(input, {
    initialCountry: "us",
    preferredCountries: ["ua", "us", "pl"],
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
    nationalMode: false,
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

        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbzQnAbGx9k7TYnq7CFn-r_KPyNn-8Ig2QO5fIxkaPRz9ZQX815ZEcdd2cF23chXYg/exec", {
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
                    arrowDiv.src = "assets/images/checkmark.svg"; // ✅ Your checkmark icon
                    arrowOuter.style.background = "none";
                    setTimeout(() => {
                        window.location.href = "https://tdmceducation.com/join";
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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Check if device is mobile
    if (window.innerWidth <= 768) {
        window.scrollTo(0, 25);
    }
});
