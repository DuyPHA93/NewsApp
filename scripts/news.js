'use strict'

const newsContainer = document.getElementById('news-container');
const paging = document.getElementById('paging');

let currentPage = 1;
const loginInfo = User.getLoginInfo();
// Get user instance
const user = loginInfo 
                ? new User(loginInfo.firstName, loginInfo.lastName, loginInfo.userName, loginInfo.password) 
                : new User();

/**
 * Load news box and page button
 * 
 * @param {*} page      Current page
 * @param {*} keyword   Keyword search
 */
function loadNewsPage(page, keyword = '') {
    user.getNewsData(page, keyword)
    .then(data => {
        console.log(data);
        // Load news box and page button
        renderPageButton(data);
        renderNews(data.articles);
    })
    .catch(err => console.error(err));
}

loadNewsPage(1);

/**
 * Render news html.
 * 
 * @param {*} data  News collection data
 */
function renderNews(data) {
    newsContainer.innerHTML = "";
    if (!data || data.length == 0) return;

    let html = '';
    data.forEach(function(item) {
        html += `
        <div class="news">
			<div class="photo">
				<img src="${item.urlToImage}" alt="${item.title}">
			</div>
			<div class="content-wrapper">
				<div class="text-content mb-2">
					<h5>${item.title}</h5>
					<div class="excerpt">
						${item.description}
					</div>
				</div>
				<button type="button" class="btn btn-primary" target="_blank" onclick="window.open('${item.url}')">View</button>
			</div>
		</div>`;
    })

    newsContainer.innerHTML = html;
}

/**
 * Render page button html.
 * 
 * @param {*} data  News collection data
 */
function renderPageButton(data) {
    if (!data || data.articles.length == 0) return;

    // Get user's setting
    const setting = user.getSetting();
    const totalResults = data.totalResults;
    const pageSize = setting ? setting.sizePage : 0;
    // Calc total page buttons
    const pageNumber = (totalResults % pageSize == 0) ? Math.trunc(totalResults / pageSize) : Math.trunc(totalResults / pageSize) + 1;
    paging.innerHTML = '';

    let html = `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}" onclick="pageClick(this, ${currentPage - 1});">
		<button class="page-link" href="#" id="btn-prev">Previous</button>
	</li>`;

    for(let i = 0; i < pageNumber; i++) {
        html += `
        <li class="page-item ${currentPage === i+1 ? 'active' : '' }">
			<a class="page-link" href="javascript:;" id="page-num-${i + 1}" onclick="pageClick(this, ${i + 1});">${i + 1}</a>
		</li>
        `;
    }

    html += `
    <li class="page-item ${currentPage === pageNumber ? 'disabled' : ''}" onclick="pageClick(this, ${currentPage + 1});">
		<button class="page-link" id="btn-next">Next</button>
	</li>
    `;

    paging.innerHTML = html;
}

/**
 * Handle click page button event
 * 
 * @param {*} e     this page button
 * @param {*} num   page number selected
 * @returns 
 */
function pageClick(e, num) {
    // Prevent click action on disable button
    if (e.classList.contains('disabled') || e.closest('li').classList.contains('active')) return;

    currentPage = num;
    // Load news
    loadNewsPage(currentPage);
}