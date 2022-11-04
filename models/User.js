'use strict'

class User {
    constructor(firstName, lastName, userName, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
    }

    // Sign up a new user
    register() {
        // Mandatory check
        if (!this.userName || !this.password) {
            return responseObject(false, 'The username and password are required!');
        }

        // Get all user
        const accounts = getDataStorage(ACCOUNT_PREFIX);

        const accountDuplicates = accounts.filter(item => item.userName === this.userName);
        // Check duplicate user
        if (accountDuplicates.length > 0) {
            return responseObject(false, 'This username has already been registered!');
        } else {
            // Add new user and store
            accounts.push(this);
            if (saveToStorage(ACCOUNT_PREFIX, JSON.stringify(accounts))) {
                console.log(`✔ Account ${this.userName} has completed registration.`);
                return responseObject(true, 'Successfully !');
            } else {
                return responseObject(false, 'Something wrong!');
            }
        }
    }

    // Login
    login() {
        // Mandatory check
        if (!this.userName || !this.password) {
            return responseObject(false, 'The username and password are required!');
        }

        // Get all user
        const accounts = getDataStorage(ACCOUNT_PREFIX);
        // Check the user is matched
        const [loginInfo] = accounts.filter(item => item.userName === this.userName && item.password == this.password);
        if (loginInfo) {
            // Save logged in user information
            saveToStorage(LOGIN_INFO_PREFIX, JSON.stringify(loginInfo));
            return responseObject(true, null);
        } else {
            return responseObject(false, 'Username or password is incorrect!');
        }
    }

    // Get news collection by user
    getNewsData(page, keyword = '') {
        const setting = this.getSetting();
        // const apiKey = '2171c1e510164ef8a259aa1f1980cd7f';   // Key 1
        const apiKey = 'ce36c497a6da403b8a1312632c287434';      // Key 2
        const country = 'us';
        // Get setting data
        const category = setting ? setting.category : '';
        const pageSize = setting ? setting.sizePage : 0;
        
        return new Promise(async function(resolve, reject) {
            try {
                // Check login
                if (!User.getLoginInfo()) resolve([]);
    
                // Fetch API
                const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&q=${keyword.replace(/\s/g, '+')}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`);
                const data = await response.json();
                if (data.status === 'error') {
                    alert(data.message);
                    throw new Error(data.message);
                }
                resolve(data);
            } catch(e) {
                console.error(`💥 ${e.message} 💥`);
            }
        })
    }

    // Get setting
    getSetting() {
        // Check login
        const loginInfo = User.getLoginInfo();
        if (!loginInfo || loginInfo.userName !== this.userName || 
            loginInfo.password !== this.password) return null;

        const settings = getDataStorage(SETTING_PREFIX);
        // Get setting by user
        const [mySetting] = settings.filter(item => item.owner === this.userName);

        return mySetting;
    }

    // Handle logout user
    static logout() {
        // Clear login user info
        return responseObject(saveToStorage(LOGIN_INFO_PREFIX, null), null);
    }

    // Get login user info
    static getLoginInfo() {
        return JSON.parse(getFromStorage(LOGIN_INFO_PREFIX));
    }
}