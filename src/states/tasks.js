import {
    reactive,
    provide,
    inject
} from 'vue';

import {
    db
} from './db.js'

const newTask = reactive({
    cycleId: null,
    name: null,
    description: null,
    zone: null
});

async function getTasks(cycleId) {
    const tasks = await db.tasks.where({
        cycleId: cycleId
    }).toArray()
    return tasks
}
async function getTask(id) {
    const task = await db.tasks.get({
        id: id
    });
    return task
}
async function deleteTask(id) {
    return await db.tasks.where({
        id: id
    }).delete();
}
async function addTask(task) {
    await db.tasks.add(task);
}

async function editTask(id, task) {
    await db.tasks.where({id: id }).modify(task);
}

async function addEditTask(taskData) {
    const {id, ...task} = taskData;
    if(id){
        return await editTask(id, task)
    }
    else {
        return await addTask(task)
    }
}

const resetNewTask = () => {
    newTask.cycleId = null;
    newTask.name = null;
    newTask.description = null;
    newTask.zone = null;
    console.log('resetting new task', JSON.stringify(newTask.value));	
}

export const tasksState = Symbol('tasks');
export const useTasksState = () => {
    const context = inject(tasksState);
    return context
}
export const getNewTask = () => {
    return newTask;
}
export const provideTasksState = (app) => {
    app.provide(tasksState, {
        newTask,
        getTasks,
        getTask,
        addEditTask,
	resetNewTask,
	deleteTask,
        getNewTask
    })
}
