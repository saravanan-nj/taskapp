<template>
    <div class="container is-fluid">
        <div class="content ml-0 mr-3 mb-3 mt-3">

            <p class="title is-4">New Cycle</p>
        </div>
        <form class="has-background-white p-5">
            <div class="field">
                <label class="label">Start Date</label>
                <div class="control">
                    <input class="input" type="date" v-model="startDate" placeholder="Start Date" />
                </div>
            </div>
            <div class="field">
                <label class="label">End Date</label>
                <div class="control">
                    <input class="input" type="date" v-model="endDate" placeholder="Start Date" />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-primary" type="button" @click=createCycle>Save</button>
                </div>
            </div>

        </form>
        <span v-if="loading">Loading</span>
    </div>
</template>
<script>
    import {
        useCyclesState
    } from '../states/cycles.js';

    export default {
        setup() {
            return {
                cycles: useCyclesState()
            };
        },
        data() {
            return {
                startDate: null,
                endDate: null,
                loading: false,
            }
        },
        methods: {
            createCycle(event) {
                this.loading = true;
                this.cycles.addCycle({
                    startDate: this.startDate,
                    endDate: this.endDate
                }).then((cycle) => {
                    this.startDate = null;
                    this.endDate = null;
                    this.$router.push('/');
                    this.loading = false;
                });
            }
        }
    }
</script>
<style>
</style>
