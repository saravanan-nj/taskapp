<template>
    <div class="container is-fluid">
        <div class="content ml-0 mr-3 mb-3 mt-3">
            <p class="title is-4">Create / Edit Task</p>
        </div>
        <form class="has-background-white p-5" v-if=task>
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="task.name" placeholder="Name" />
                </div>
            </div>
            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <textarea class="textarea" v-model="task.description" placeholder="Description" />
                </div>
            </div>
            <div class="field">
                <label class="label">Zone</label>
                <div class="control">
                    <div class="select">
                        <select v-model="zoneId" @change=checkNewZone>
                            <option value="New Zone">New Zone</option>
                            <option v-for="zone in zones" v-bind:value="zone.id">
                                {{zone.name}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-primary" type="button" @click=createEditTask>Save</button>
                </div>
                <div class="control">
                    <button class="button is-link" type="button" @click=cancel>Cancel</button>
                </div>
            </div>
        </form>
        <span v-if="loading">Loading</span>
    </div>
</template>

<script>
    import {
        useTasksState
    } from '../states/tasks.js';

    import {
        useZonesState
    } from '../states/zones.js';


    export default {
        props: ['cycleId', 'taskId'],
        setup() {
            return {
                tasks: useTasksState(),
                zonesState: useZonesState(),
            };
        },
        created() {
            this.fetchZonesAndTask()
        },
        watch: {
            '$route': 'fetchZonesAndTask'
        },
        data() {
            return {
                zones: null,
                loading: false,
                zoneId: null,
                task: null,
            }
        },
        methods: {
            fetchTask() {
                if (this.taskId) {
                    return this.tasks.getTask(Number.parseInt(this.taskId)).then((task) => {
                        this.task = task;
                        this.zoneId = task.zoneId;
                    });
                } else {
                    this.task = this.tasks.newTask;
                    return Promise.resolve(0);
                }
            },
            fetchZones() {
                return this.zonesState.getZones().then((zones) => {
                    this.zones = zones
                });
            },
            fetchZonesAndTask() {
                this.loading = true;
                const promises = [this.fetchTask(), this.fetchZones()]
                Promise.all(promises).then(() => {
                    this.loading = false;
                });
            },
            checkNewZone(event) {
                if (event.target.value == 'New Zone') {
                    this.$router.push({
                        'name': 'NewZone'
                    })
                }
            },
            createEditTask(event) {
                this.loading = true;
                this.tasks.addEditTask({
                    id: Number.parseInt(this.taskId),
                    cycleId: Number.parseInt(this.cycleId),
                    zoneId: Number.parseInt(this.zoneId),
                    name: this.task.name,
                    description: this.task.description
                }).then((task) => {
                    if (!!!this.taskId) {
                        this.tasks.resetNewTask();
                    }
                    this.$router.push({
                        name: 'CycleDetails',
                        params: {
                            cycleId: this.cycleId
                        }
                    });
                    this.loading = false;
                });
            },
            cancel(event) {
                this.$router.push({
                    name: 'CycleDetails',
                    params: {
                        cycleId: this.cycleId
                    }
                });

            }
        }
    }
</script>

<style>
</style>
