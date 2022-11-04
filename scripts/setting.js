'use strict'

const sizePageInput = document.getElementById('input-page-size');
const categoryInput = document.getElementById('input-category');
const btnSubmit = document.getElementById('btn-submit');

const loginInfo = User.getLoginInfo();
const settings = getDataStorage(SETTING_PREFIX);
// Get user's setting
const [currentSetting] = loginInfo ? settings.filter(item => item.owner === loginInfo.userName) : [];

// Fill data into input
if (currentSetting) {
    sizePageInput.value = currentSetting.sizePage;
    categoryInput.value = currentSetting.category;
}

/**
 * Handle submit button event
 */
btnSubmit.addEventListener('click', function() {
    // Check login
    if (!loginInfo) {
        alert('Please login !');
        // Redirect to login page
        window.location.href = 'login.html';
        return;
    }

    // Get data
    const data = {
        sizePage: sizePageInput.value,
        category: categoryInput.value,
        owner: loginInfo.userName
    }

    // Validate
    if (Number(data.sizePage) < 1) {
        alert('News per page must have at least 1!'); return;
    }

    const settings = getDataStorage(SETTING_PREFIX);
    // Get user's setting
    const currentSetting = settings.filter(item => item.owner === loginInfo.userName);
    
    // Check the user's settings are existent, then update
    if (currentSetting.length > 0) {
        settings.map(item => {
            if (item.owner === loginInfo.userName) {
                item.sizePage = data.sizePage;
                item.category = data.category;
            }
    
            return item;
        })
    // Otherwise, add new
    } else {
        settings.push(data);
    }
    
    // Storage
    if (saveToStorage(SETTING_PREFIX, JSON.stringify(settings))) {
        alert('Saved !');
    }

})