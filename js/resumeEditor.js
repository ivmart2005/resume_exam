document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
    var editableElements = document.querySelectorAll('[contenteditable="true"]');
    for (var i = 0; i < editableElements.length; i++) {
        editableElements[i].addEventListener('blur', saveDataToLocalStorage);
        editableElements[i].addEventListener('focus', function() {
            this.style.backgroundColor = 'var(--green-color)';
            this.style.color = 'white';
        });
        editableElements[i].addEventListener('blur', function() {
            this.style.backgroundColor = '';
            this.style.color = '';
        });
    }
});

function saveDataToLocalStorage() {
    var savedData = {};
    var elements = document.querySelectorAll('[contenteditable="true"]');
    for (var i = 0; i < elements.length; i++) {
        var key = elements[i].getAttribute('data-key');
        if (key) {
            savedData[key] = elements[i].textContent.trim();
        }
    }
    localStorage.setItem('resumeData', JSON.stringify(savedData));
}

function loadSavedData() {
    var savedData = localStorage.getItem('resumeData');
    if (!savedData) return;
    try {
        var data = JSON.parse(savedData);
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var element = document.querySelector('[data-key="' + key + '"]');
                if (element) {
                    element.textContent = data[key];
                }
            }
        }
    } catch (e) {
        console.error('Failed to parse saved data:', e);
    }
}