'use strict'

const taskInput = document.getElementById('input-task');
const taskList = document.getElementById('todo-list');
const addBtn = document.getElementById('btn-add');
const removeBtns = document.querySelectorAll('.close');

const loginInfo = User.getLoginInfo();

/**
 * Render task table
 * 
 * @returns 
 */
function renderTaskTable() {
    taskList.innerHTML = "";

    // Check login
    if (!loginInfo) return;

    const tasks = getDataStorage(TASK_PREFIX).filter(item => item.owner === loginInfo.userName);
    
    // Render task
    tasks.forEach(function(item) {
        const taskNode = document.createElement('li');
        const closeNode = document.createElement('span');
        const task = parseTask(item);

        taskNode.textContent = task.task;
        taskNode.classList.add(task.isDone ? 'checked' : null);
        // Task item click event
        taskNode.addEventListener('click', function() {
            if (task.toggle(item.id, task.isDone ? false : true)) {
                renderTaskTable();
                console.log(`Task ${task.task} is ${task.isDone ? 'in progress' : 'done'}.`);
            }
        })

        closeNode.classList.add('close');
        closeNode.textContent = '×';
        // Close button click event
        closeNode.addEventListener('click', function() {
            if (task.delete(item.id)) {
                renderTaskTable();
                console.log(`Task ${task.task} has been deleted.`);
            }
        })

        taskNode.append(closeNode);
        taskList.append(taskNode);
    })
}

/**
 * Handle add task button event
 */
addBtn.addEventListener('click', function() {
    // Check login
    if (!loginInfo) {
        alert('Please login !');
        // Redirect to login page
        window.location.href = 'login.html';
        return;
    }

    // Validate
    if (!taskInput.value) {
        alert('Please enter the title !'); return;
    }

    const task = new Task(taskInput.value, loginInfo.userName, false);

    // Add a task
    if (task.add()) {
        taskInput.value = "";
        // Render task table
        renderTaskTable();
        console.log(`Task ${task.task} has been added.`)
    }

})

renderTaskTable();