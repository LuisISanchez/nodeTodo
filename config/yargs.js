const description = {
    alias: "d",
    demand: true,
    desc: "Describe your task"
}

const completed =  {
    alias: "c",
    default: true,
    desc: "Set the status of your task"
}

const filter = {
    alias: "f",
    default: false,
    desc: "Use the completed filter"
}

const {
    argv
} = require('yargs')
    .command("create", "Crea a new task to do", {
        description
    })
    .command("show", "Show all your tasks", {
        filter,
        completed
    })
    .command("update", "Done a pending task", {
        description,
        completed
    }).command("delete", "Deletes a task", {
        description
    }).help();


module.exports = {
    argv
}