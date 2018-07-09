const fs = require('fs');
const colors = require('colors');
let todoList = [];

const crear = async description => {
    let todo = {
        description,
        completed: false
    };
    todoList.push(todo);
    return await saveJSON().then(() => todo);
}

const saveJSON = async () => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify(todoList);
        console.log('Syncing your list...'.yellow);
        fs.writeFile('./db/data.json', data, err => {
            if (err) {
                reject("An unexpected error has ocurred, try again later\n", err);
            }
            console.log('Updated!'.green);
            resolve();
        });
    });

}

const loadJSON = async () => {
    try {
        todoList = require('../db/data.json');
    } catch (error) {
        todoList = []
    }

}

const getList = (filter, completed) => {
    if (filter) {
        return todoList.filter(task => task.completed === (completed === "true"));
    }
    return todoList;
}

const update = async (description, completed = true) => {
    let idx = todoList.findIndex(task => task.description === description);
    if (idx >= 0) {
        todoList[idx].completed = completed;
        return await saveJSON().then(() => true);
    } else {
        return false;
    }

}

const erase = async description => {
    let newTodoList = todoList.filter(task => task.description !== description);

    if (newTodoList.length === todoList.length) {
        return false;
    } else {
        todoList = newTodoList;
        return await saveJSON().then(() => true);
    }
}

module.exports = {
    crear,
    loadJSON,
    getList,
    update,
    erase
}