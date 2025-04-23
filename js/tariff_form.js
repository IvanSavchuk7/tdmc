const checkboxes = document.querySelectorAll('.radio-wrapper input[type="checkbox"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        checkboxes.forEach(c => {
            if (c !== this) c.checked = false;
        });
    });
});

// 2. Initialize phone input


// 3. Main form logic
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("masterclass-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById("submit-btn");
        submitBtn.disabled = true;

        const arrowDiv = submitBtn.querySelector(".arrow img");
        const loader = submitBtn.querySelector(".dot-spinner");
        const arrowOuter = submitBtn.querySelector(".arrow");

        // Reset visuals
        arrowDiv.style.display = "none";
        arrowOuter.style.display = "none";
        submitBtn.childNodes[submitBtn.childNodes.length - 1].textContent = "";
        loader.style.display = "block";

        // ✅ CHECK IF INCOME RANGE IS SELECTED
        const selected = document.querySelector('.radio-wrapper input[type="checkbox"]:checked');
        if (!selected) {
            alert("Please select your income range.");
            submitBtn.disabled = false;
            loader.style.display = "none";
            arrowDiv.style.display = "block";
            arrowOuter.style.display = "block";
            return;
        }

        // ✅ ADD hidden input for income
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
