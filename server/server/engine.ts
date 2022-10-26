import fs from "fs";
import path from "path";

import { IncomingMessage, ServerResponse } from "http";
import  { Task }  from "./ITask";

const getTasks = (req: IncomingMessage, res: ServerResponse)=>{
    return fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data)=>{
        if(err){
            res.writeHead(500, {"Content-Type": "application/json"})
            res.end(JSON.stringify({message: "Error don dey o"}))
        } else {
            res.writeHead(200, {"Content-Type": "applicaton/json"});
            res.end(JSON.stringify({success: true, Message: JSON.parse(data)}))
        }
    })
}

const addTasks = (req: IncomingMessage, res: ServerResponse) => {
    let data = '';
    req.on('data', (chunk)=>{
        data += chunk.toString();
    })
    req.on('end', () =>{
        let task = JSON.parse(data);
        fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data)=>{
            if(err){
                res.writeHead(500, {"Content-Type": "application/json"});
                res.end(JSON.stringify({ message: "error file no dey"}));
            } else {
                let tasks: Task[] = JSON.parse(data)
                tasks.push(task);
                fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(tasks), (err)=>{
                    if(err){
                        res.writeHead(500, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({message: "error don dey here too"}));
                    } else {
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({success: true, message: "Tasks added succesfully enjoy"}))
                    }

                })
            }
        })

    })
}
const updateTask = (req: IncomingMessage, res: ServerResponse) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk.toString();
    })
    req.on('end', () => {
        let task: Task = JSON.parse(data);
        fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) =>{
            if(err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
            }else {
                let tasks: Task[] = JSON.parse(data);
                let taskIndex = tasks.findIndex((t: Task) => t.id === task.id);
                tasks[taskIndex] = task;
                fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(tasks), (err) => {
                    if(err) {
                        res.writeHead(500, { 'Content-Type': 'application'});
                        res.end(JSON.stringify({message: 'Error writing file', error: err}));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json'});
                        res.end(JSON.stringify({ success: true, message: 'Task updated successfully', task}))
                    }
                })
            }
        })
    })
}
const deleteTask =(req: IncomingMessage, res: ServerResponse) => {
    let data = "";
    req.on("data", (chunk) => {
        data += chunk.toString();
    })

    req.on("end", () => {
        let task: Task = JSON.parse(data);
        fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data) => {
            if(err) {
                res.writeHead(500, {"Content-Type": "application/json"});
                res.end(JSON.stringify({message: "Error reading file", error: err}));

            } else {
                let tasks: [Task] = JSON.parse(data);
                let taskIndex = tasks.findIndex((t) => t.id == task.id);
                tasks.splice(taskIndex, 1);
                fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(tasks), (err) =>{
                    if (err) {
                        res.writeHead(500, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({message: "Error writing file", error: err}));

                    }else {
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({success: true, message: "Task deleted successfully"}));
                    }
                })
            }
        })
    })
}

export {getTasks, addTasks, updateTask, deleteTask}