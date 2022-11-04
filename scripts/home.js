'use strict'


const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMessage = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('btn-logout');

const loginInfo = User.getLoginInfo();

if (loginInfo) {
    // Show only the logout button
    loginModal.style.display = 'none';
    // Show greeting
    welcomeMessage.textContent = `Welcome ${loginInfo.firstName}`;
} else {
    // Show login button and register button
    mainContent.style.display = 'none';
}

/**
 * Handle logout button event
 */
logoutBtn.addEventListener('click', function() {
    if (User.logout().success) {
        // Redirect to login page
        window.location.href = "pages/login.html";
    }
})