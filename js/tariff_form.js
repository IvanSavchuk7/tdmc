const checkboxes = document.querySelectorAll('.radio-wrapper input[type="checkbox"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        checkboxes.forEach(c => {
            if (c !== this) c.checked = false;
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let firstInvalidInput = null;

        // Reset all messages
        const allMsgs = form.querySelectorAll('.msg');
        allMsgs.forEach(msg => msg.style.opacity = "0");

        // Validate all required fields
        const requiredFields = form.querySelectorAll("input[required]");
        requiredFields.forEach(input => {
            const msg = input.parentElement.querySelector('.msg');
            const pattern = input.getAttribute("pattern");
            const regex = pattern ? new RegExp(pattern) : null;
            const isEmpty = input.value.trim() === "";

            if (isEmpty || (regex && !regex.test(input.value.trim()))) {
                if (msg) msg.style.opacity = "1";
                if (!firstInvalidInput) firstInvalidInput = input;
            }
        });

        // Validate income checkbox selection
        const selected = form.querySelector('.radio-wrapper input[type="checkbox"]:checked');
        if (!selected) {
            const incomeMsg = form.querySelector('.income-section .msg');
            if (incomeMsg) incomeMsg.style.opacity = "1";
            if (!firstInvalidInput) firstInvalidInput = form.querySelector('.income-section');
        }

        if (firstInvalidInput) {
            firstInvalidInput.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        // Form is valid, submit
        const submitBtn = document.getElementById("submit-btn");
        submitBtn.disabled = true;

        const arrowDiv = submitBtn.querySelector(".arrow img");
        const loader = submitBtn.querySelector(".dot-spinner");
        const arrowOuter = submitBtn.querySelector(".arrow");

        arrowDiv.style.display = "none";
        arrowOuter.style.display = "none";
        submitBtn.childNodes[submitBtn.childNodes.length - 1].textContent = "";
        loader.style.display = "block";

        let incomeInput = document.querySelector('input[name="Income Range"]');
        if (!incomeInput) {
            incomeInput = document.createElement("input");
            incomeInput.type = "hidden";
            incomeInput.name = "Income Range";
            form.appendChild(incomeInput);
        }
        incomeInput.value = selected.value;

        const formData = new FormData(form);

        fetch("https://script.google.com/macros/s/AKfycbx577BpBcdMzzas2pBQp0Wybtf3xfrz3OKfi0a_0K2X0wi8mE-2xC6Lcy9TteyTikJG/exec", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.result === "success") {
                    submitBtn.style.display = "flex";
                    submitBtn.style.alignItems = "center";
                    submitBtn.style.justifyContent = "center";
                    arrowOuter.style.display = "block";
                    arrowOuter.style.background = "none";
                    arrowDiv.style.display = "block";
                    loader.style.display = "none";
                    arrowDiv.src = "../assets/images/checkmark.svg";
                    arrowOuter.style.background = "none";
                    submitBtn.classList.add("submitted");

                    setTimeout(() => {
                        window.location.href = "/";
                    }, 500);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Something went wrong. Please try again later.");
                submitBtn.disabled = false;
                loader.style.display = "none";
                arrowDiv.style.display = "block";
                arrowOuter.style.display = "block";
            });
    });
});

