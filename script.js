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
window.intlTelInput(input, {
    initialCountry: "ua",
    preferredCountries: ["ua", "us", "pl"],
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
});