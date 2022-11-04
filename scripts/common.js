'use strict';

const ACCOUNT_PREFIX = 'Accounts';
const LOGIN_INFO_PREFIX = 'Login_info';
const TASK_PREFIX = 'Tasks';
const SETTING_PREFIX = 'Settings';

/**
 * Get object data stored
 * 
 * @param {*} prefix 
 * @return Array
 */
function getDataStorage(prefix) {
    return getFromStorage(prefix) ? JSON.parse(getFromStorage(prefix)) : [];
}

/**
 * Parse data to user instance
 * 
 * @param {*} data 
 * @return User instance
 */
function parseUser(data) {
	const user = new User(data.firstName, data.lastName, data.userName, data.password)

	return user;
}

/**
 * Parse data to task instance
 * 
 * @param {*} data 
 * @return Task instance
 */
function parseTask(data) {
	const task = new Task(data.task, data.owner, data.isDone)

	return task;
}

/**
 * Get login info
 * 
 * @return Object
 */
function getLoginInfo() {
	return JSON.parse(getFromStorage(LOGIN_INFO_PREFIX));
}

/**
 * Get object response
 * 
 * @param {*} success 
 * @param {*} message 
 * @return Object
 */
function responseObject(success, message) {
	return { success: success, message: message }
}