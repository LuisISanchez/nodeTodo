const {argv} = require('./config/yargs');
const colors = require('colors');
const todo = require('./to-do/to-do')
let comando = argv._[0];
let {description, completed,filter} = argv;

todo.loadJSON().then(()=>{
    switch(comando){
        case 'create':
            todo.crear(description).then(task=>{
                console.log(`You have a new pending task: ${ task.description.white }`.blue);
            });
            
        break;
        case 'show':
            let list = todo.getList(filter,completed);
            for(let task of list){
                console.log(`========${ !task.completed?"TODO".yellow:"DONE".green.blue }${"========".blue}`.blue);
                console.log(task.description);
                console.log(`Status: ${task.completed?"Completed":"Pending"}`);
                console.log("====================".blue);
            }
        break;
        case 'update':
            todo.update(description,completed).then((res)=>console.log(res?"Done".green:"Failed".red));
            
        break;
        case 'delete':
            todo.erase(description).then(res=>{
                console.log(res?`Your task ${description} has been deleted`.green:`Failed`.red);
            });
            break;
        default:
            console.log("comando no reconocido");
    }
});
