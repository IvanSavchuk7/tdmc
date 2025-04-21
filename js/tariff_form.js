const checkboxes = document.querySelectorAll('.radio-wrapper input[type="checkbox"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        // uncheck all others
        checkboxes.forEach(c => {
            if (c !== this) c.checked = false;
        });
    });
});

const form = document.getElementById("waitlist-form"); // or your form ID

form.addEventListener("submit", function (e) {
    const selected = document.querySelector('.radio-wrapper input[type="checkbox"]:checked');
    if (!selected) {
        e.preventDefault();
        alert("Please select your income range.");
        return;
    }

    // 👇 Add hidden input to pass data to Google Sheets
    let incomeInput = document.querySelector('input[name="Income Range"]');
    if (!incomeInput) {
        incomeInput = document.createElement("input");
        incomeInput.type = "hidden";
        incomeInput.name = "Income Range";
        form.appendChild(incomeInput);
    }

    const label = selected.closest(".radio-group").querySelector(".radio-text");
    incomeInput.value = label ? label.textContent.trim() : "Not selected";
});
