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
    nationalMode: false, // ✅ this ensures +380 appears in the input
});
const form = document.getElementById("waitlist-form");
const thankYou = document.getElementById("thank-you");

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("waitlist-form");
    const thankYou = document.getElementById("thank-you");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbzqA2npUUzi_IsiD9U0A3SBB1VkaUdQib_pUhaql-q7IPvFDI-eWHhAEK0sh8tNbqlY/exec", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success") {
                    const submitBtn = document.getElementById("submit-btn");

                    // Change the image
                    const arrowDiv = submitBtn.querySelector(".arrow img");
                    const arrowOuter = submitBtn.querySelector(".arrow");
                    arrowDiv.src = "assets/images/checkmark.svg"; // ✅ Your checkmark icon
                    arrowOuter.style.background = "none";
                    // Change the text
                    submitBtn.childNodes[submitBtn.childNodes.length - 1].textContent = "Thanks joining us!";
                    setTimeout(() => {
                        window.location.href = "https://chat.whatsapp.com/B6v2ArxNzgPGeYFizEWq7H";
                    }, 500);
                    // Optional: disable the button or style it
                    submitBtn.disabled = true;
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
