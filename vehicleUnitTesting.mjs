import {Vehicle} from './Vehicle.mjs'

let tests = [
    {entrance:'2020-01-01T00:00:00.000Z',exit:'2020-01-01T00:01:00.000Z',expected:0},
    {entrance:'2020-01-01T00:00:00.000Z',exit:'2020-01-01T00:59:59.000Z',expected:0},
    {entrance:'2020-01-01T00:00:00.000Z',exit:'2020-01-01T01:00:00.000Z',expected:1},
    {entrance:'2020-01-01T00:00:00.000Z',exit:'2020-01-01T01:00:00.000Z',expected:2}
]

const createVehicle = (entranceTimestamp,exitTimestamp) =>{
    let vehicle = new Vehicle('1',1,entranceTimestamp)
    vehicle.exit(exitTimestamp);
    return vehicle;
}

tests.forEach((val,testIndex)=>{
    let vehicle = createVehicle(val.entrance,val.exit);
    if(vehicle.timeSpentInPark() == val.expected){
        console.log('----------------');
        console.log(`Test number ${testIndex} passed`);
        console.log(`Time spent in park: ${vehicle.timeSpentInPark()} | Time expected: ${val.expected}`)
    }
    else{
        console.log('----------------')
        console.log(`Test number ${testIndex} failed`);
        console.log(`Time spent in park: ${vehicle.timeSpentInPark()} | Time expected: ${val.expected}`)
    }
})