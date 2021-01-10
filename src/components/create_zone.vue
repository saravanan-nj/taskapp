<template>
    <div class="container is-fluid">
        <div class="content ml-0 mr-3 mb-3 mt-3">
            <p class="title is-4">New Zone</p>
        </div>
        <form class="has-background-white p-5">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="name" placeholder="Name" />
                </div>
            </div>
            <div class="field">
                <label class="label">Description</label>
                <div class="control">
                    <textarea class="textarea" v-model="description" placeholder="Description" />
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button is-primary" type="button" @click=createZone>Save</button>
                </div>
            </div>
        </form>
        <span v-if="loading">Loading</span>
    </div>
</template>

<script>
    import {
        useZonesState
    } from '../states/zones.js';

    export default {
        setup() {
            return {
                zones: useZonesState()
            };
        },
        data() {
            return {
                name: null,
                description: null,
                loading: false,
            }
        },
        methods: {
            createZone(event) {
                this.loading = true;
                this.zones.addZone({
                    name: this.name,
                    description: this.description
                }).then((zone) => {
                    this.name = null;
                    this.description = null;
                    this.loading = false;
                    this.$router.go(-1);
                });
            }
        }
    }
</script>

<style>
</style>
