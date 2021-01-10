<template>
    <div class="card mb-4">
        <header class="card-header">
            <p class="card-header-title">
                {{ task.name }}
                <span v-if=zone class="ml-3 tag is-primary">{{zone.name}}</span>
            </p>
        </header>
        <div class="card-content">
            <p>{{ task.description }}</p>
        </div>
        <footer class="card-footer">
            <a href="#" @click=editTask class="card-footer-item">Edit</a>
            <a href="#" @click=deleteTask class="card-footer-item">Delete</a>
        </footer>
    </div>
</template>
<script>
    import {
        useZonesState
    } from '../states/zones.js';
    import {
        useTasksState
    } from '../states/tasks.js';


    export default {
        props: ['task', 'cycleId'],
        setup() {
            return {
                zonesState: useZonesState(),
		tasksState: useTasksState()
            }
        },
        created() {
            this.fetchZone()
        },
        watch: {
            '$route': 'fetchZone'
        },
        data() {
            return {
                zone: null,
                loading: false,
            }
        },
        methods: {
            editTask() {
                this.$router.push({
                    name: "EditTask",
                    params: {
                        cycleId: this.cycleId,
                        taskId: this.task.id
                    }
                });
            },
	    deleteTask() {
	        this.tasksState.deleteTask(this.task.id).then(() => {
		    this.$router.go();
		});
	    },
            fetchZone() {
                if (this.task.zoneId) {
                    this.zonesState.getZone(this.task.zoneId).then((zone) => {
                        this.zone = zone
                    });
                }
            }
        }
    }
</script>
<style>
</style>
