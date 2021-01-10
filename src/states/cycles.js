import {
    ref,
    provide,
    inject
} from 'vue';

import {
    db
} from './db.js'

async function getCycles() {
    const cycles = await db.cycles.orderBy('id').reverse().toArray()
    return cycles
}
async function getCycle(cycleId) {
    const cycle = await db.cycles.where({
        'id': Number.parseInt(cycleId)
    }).first()
    return cycle
}
async function addCycle(cycle) {
    await db.cycles.add(cycle);
}
export const cyclesState = Symbol('cycles');
export const useCyclesState = () => {
    const context = inject(cyclesState);
    return context
}
export const provideCyclesState = (app) => {
    app.provide(cyclesState, {
        getCycles,
        getCycle,
        addCycle
    })
}
