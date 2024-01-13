// script.js

function updateDateTime(elementId, format) {
    const now = new Date();
    const currentDateTime = now.toLocaleString(undefined, format);
    document.querySelector(`#${elementId}`).textContent = currentDateTime;
}

setInterval(() => updateDateTime('datetime', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
}));


document.addEventListener('DOMContentLoaded', function () {
    var checkboxes = document.querySelectorAll('.check-box');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            var listItem = this.closest('.list-group-item');
            listItem.classList.toggle('checked', this.checked);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var checkboxes = document.querySelectorAll('.check-box');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            var removeForm = this.closest('.list-group-item').querySelector('.remove-form');
            if (this.checked) {
                removeForm.style.display = 'inline';
            } else {
                removeForm.style.display = 'none';
            }
        });
    });
});

