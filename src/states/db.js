import Dexie from 'dexie';


export const db = new Dexie("tasksdb")
db.version(1).stores({
    cycles: "++id,startDate,endDate",
    tasks: "++id,cycleId,name,description",
    zones: "++id,name,description"
})
