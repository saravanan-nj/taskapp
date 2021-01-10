<template>
    <div v-if="loading" class="has-text-info">Loading...</div>
    <div v-else class="container is-fluid">
        <div class="card has-background-white p-3 mt-3 mr-3 mb-3">
	    <header class="card-content p-0">
                <p class="is-large">From {{ cycle.startDate }} To {{ cycle.endDate }}</p>
	    </header>
        </div>
        <div class="mr-3 ml-0 mt-3 mb-5">
            <router-link class="button is-link" :to="{ name: 'CreateTask', params:{  cycleId: cycle.id }}" tag="button">Create Task</router-link>
        </div>
        <div v-for="task in tasks">
	    <Task v-bind:task="task" v-bind:cycleId="this.cycleId"/>
        </div>
    </div>
</template>
<script>
    import {
        useCyclesState
    } from '../states/cycles.js';
    import Task from './task.vue';
    import {
        useTasksState
    } from '../states/tasks.js';
    export default {
        props: ['cycleId'],
	components: {
	    Task
	},
        setup() {
            return {
                cyclesState: useCyclesState(),
                tasksState: useTasksState(),
            }
        },
        data() {
            return {
                cycle: null,
                tasks: [],
                loading: false,
            }
        },
        created() {
            this.fetchCycleAndTasks()
        },
        watch: {
            '$route': 'fetchCycleAndTasks'
        },
        methods: {
            fetchCycleAndTasks() {
                this.loading = true
                const cycleId = this.cycleId
                const promises = [
                    this.cyclesState.getCycle(Number.parseInt(this.cycleId)),
                    this.tasksState.getTasks(Number.parseInt(this.cycleId))
                ]
                Promise.all(promises).then(([cycle, tasks]) => {
                    this.cycle = cycle
                    this.tasks = tasks
		    this.loading = false;
                })
            }
        }
    }
</script>
