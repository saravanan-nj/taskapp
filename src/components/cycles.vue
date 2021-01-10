<template>
    <div class="container is-fluid">
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <div class="mr-3 ml-0 mt-3 mb-5">
                        <router-link to="/new-cycle" class="button is-primary">Create Cycle</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="loading" class="has-text-info">Loading...</div>
        <div v-for="cycle in cycles" class="columns mb-5 has-background-white has-text-weight-medium">
            <div class="column ">
                <span>Start Date: {{ cycle.startDate }}</span>
            </div>
            <div class="column">
                <span>End Date: {{ cycle.endDate }} </span>
            </div>
            <div class="column">
                <router-link class="button is-primary" :to="{ name: 'CycleDetails', params: { cycleId: cycle.id }}">View Cycle</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        useCyclesState
    } from '../states/cycles.js';
    export default {
        setup() {
            return {
                cyclesState: useCyclesState()
            }
        },
        data() {
            return {
                cycles: [],
                loading: false
            }
        },
        created() {
            this.fetchCycles()
        },
        watch: {
            '$route': 'fetchCycles'
        },
        methods: {
            fetchCycles() {
                this.loading = true
                this.cyclesState.getCycles().then((cycles) => {
                    this.cycles = cycles
                    this.loading = false
                });
            }
        }
    }
</script>
<style>
</style>
