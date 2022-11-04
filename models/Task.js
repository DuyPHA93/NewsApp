'use strict'

class Task {
    constructor(task, owner, isDone) {
        this.task = task;
        this.owner = owner;
        this.isDone = isDone;
    }

    // Add a task
    add() {
        // Check login
        if (!User.getLoginInfo()) return false;

        // Get milisecond time for id task
        const d = new Date();
        this.id = d.getTime();

        const tasks = getDataStorage(TASK_PREFIX);
        // Add new task
        tasks.push(this);

        // Store
        return saveToStorage(TASK_PREFIX, JSON.stringify(tasks));
    }

    // Delete a task
    delete(id) {
        const tasks = getDataStorage(TASK_PREFIX);
        // Get all tasks except deleted task
        const filter = tasks.filter(item => item.id !== id);

        // Store
        return saveToStorage(TASK_PREFIX, JSON.stringify(filter));
    }

    // Completion mode toggle
    toggle(id, isDone) {
        const tasks = getDataStorage(TASK_PREFIX);
        // Change isDone value which id task match
        tasks.map(item => {
            if (item.id === id) item.isDone = isDone;
            return item;
        })

        // Store
        return saveToStorage(TASK_PREFIX, JSON.stringify(tasks));
    }
}