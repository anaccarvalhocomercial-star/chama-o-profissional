const ValidationService = {
    isWhatsAppValid(number) {
        const cleanNumber = number.replace(/\D/g, '');
        return cleanNumber.length >= 10 && cleanNumber.length <= 11;
    },

    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.innerText = message;
            errorElement.style.display = 'block';
        }
    },

    clearErrors() {
        const errors = document.querySelectorAll('.msg-erro');
        errors.forEach(err => {
            err.innerText = '';
            err.style.display = 'none';
        });
    }
};