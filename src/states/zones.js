import {
    ref,
    provide,
    inject
} from 'vue';

import {
    db
} from './db.js'

async function getZones() {
    const zones = await db.zones.orderBy('id').toArray()
    return zones
}
async function getZone(id) {
    const zone = await db.zones.get({
        id: id
    });
    return zone
}
async function addZone(zone) {
    await db.zones.add(zone);
}
export const zonesState = Symbol('zones');
export const useZonesState = () => {
    const context = inject(zonesState);
    return context
}
export const provideZonesState = (app) => {
    app.provide(zonesState, {
        getZones,
        getZone,
        addZone
    })
}
