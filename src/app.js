import * as Vue from 'vue/dist/vue.esm-bundler.js'
import {
    createWebHistory,
    createRouter
} from "vue-router";
import CreateCycle from './components/create_cycle.vue'
import Cycles from './components/cycles.vue'
import Cycle from './components/cycle.vue'
import CreateTask from './components/create_task.vue'
import CreateZone from './components/create_zone.vue'
import App from './components/app.vue'
import { Settings } from './settings.js'


// Scss
import * as Styles from './styles/styles.scss'


// States
import { provideCyclesState } from './states/cycles.js'
import { provideTasksState } from './states/tasks.js'
import { provideZonesState } from './states/zones.js'


const routes = [
    {
        path: Settings.HOME_PATH,
        name: "Cycles",
        component: Cycles
    },
    {
        path: "/new-cycle",
        name: "NewCycle",
        component: CreateCycle
    },
    {
        path: "/new-zone",
        name: "NewZone",
        component: CreateZone
    },
    {
        path: '/cycle/:cycleId',
	name: 'CycleDetails',
	component: Cycle,
	props: true
    },
    {
        path: '/cycle/:cycleId/new-task',
	name: 'CreateTask',
	component: CreateTask,
	props: true
    },
    {
	path: '/cycle/:cycleId/:taskId',
	name: 'EditTask',
	component: CreateTask,
	props: true
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})


const app = Vue.createApp(App).use(router)
provideCyclesState(app);
provideTasksState(app);
provideZonesState(app);
app.mount('#app');
