'use strict'

// Input
const userNameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
// Button
const submitBtn = document.getElementById('btn-submit');

/**
 * Login validation
 * 
 * @param {*} data 
 * @return String
 */
function validateLoginData(data) {
    if (!data.userName) {
        return 'The Username field is required!';
    } else if (!data.password) {
        return 'The password field is required!';
    }

    return null;
}

/**
 * Handle submit button event
 */
submitBtn.addEventListener('click', function() {
    const data = {
        userName: userNameInput.value,
        password: passwordInput.value,
    }

    // Validate
    const validateMessage = validateLoginData(data);
    if (validateMessage) {
        alert(validateMessage); return;
    }

    const user = new User(null, null, data.userName, data.password);
    // Login
    const login = user.login();
    if (login.success) {
        // Redirect to login page
        window.location.href = "../index.html";
    } else {
        alert(login.message);
    }
})