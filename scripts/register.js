'use strict'

// Input
const firstNameInput = document.getElementById('input-firstname');
const lastNameInput = document.getElementById('input-lastname');
const userNameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const passwordConfirmInput = document.getElementById('input-password-confirm');
// Button
const registerBtn = document.getElementById('btn-submit');

/**
 * Regist account validation
 * 
 * @param {*} data Input data
 * @return String
 */
function validateRegistorData(data) {
    if (!data.firstName) {
        return 'The first name field is required!';
    } else if (!data.lastName) {
        return 'The last name field is required!';
    } else if (!data.userName) {
        return 'The Username field is required!';
    } else if (data.password.length <= 8) {
        return 'Password must be more than 8 characters';
    } else if (data.password !== data.passwordConfirm) {
        return 'Password and confirm password do not match';
    }

    return null;
}

/**
 * Handle register button event
 */
registerBtn.addEventListener('click', function() {
    // Get data
    const data = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        userName: userNameInput.value,
        password: passwordInput.value,
        passwordConfirm: passwordConfirmInput.value,
    }

    // Validate
    const validateMessage = validateRegistorData(data);
    if (validateMessage) {
        alert(validateMessage);
        return;
    }

    const user = new User(data.firstName, data.lastName, data.userName, data.password);
    // Regist account success
    const register = user.register();
    
    alert(register.message);

    if (register.success) {
        // Redirect to login page
        window.location.href = "login.html";
    }
})