'use strict'

const queryInput = document.getElementById('input-query');
const searchBtn = document.getElementById('btn-submit');

// Reuse the news script

/**
 * Handle search button event
 */
searchBtn.addEventListener('click', function() {
    const keyword = queryInput.value ? queryInput.value : '';
    // Validate
    if (!keyword) {
        alert('Please enter keywords!');
        return;
    }
    // Load news
    loadNewsPage(1, keyword);
})