import { Vehicle } from "./Vehicle.mjs";

export class LogManager {
    activeParks = [];
    pastParks = [];
    hours = [];
    busiestHour = 0;
    constructor(openingTime, closingTime) {
        this.openingTime = openingTime;
        this.closingTime = closingTime;
    }

    addToLog(vehiclesArr) {
        vehiclesArr.forEach((vehicle) => {
            let vehicleToAdd = this.activeParks.filter((log) => {
                return vehicle[0] == log.id;
            })

            if (vehicleToAdd.length == 0 && vehicle[3] == "ENTRANCE") {
                vehicleToAdd = new Vehicle(vehicle[0], vehicle[1], vehicle[2], vehicle[3]);
                this.activeParks.push(vehicleToAdd);
            }
            else if (vehicleToAdd.length != 0 && vehicle[3] == "EXIT") {
                vehicleToAdd = vehicleToAdd[0];
                vehicleToAdd.timestamp = vehicle[2];
                vehicleToAdd.exit(vehicleToAdd.timestamp);
                this.pastParks.push(vehicleToAdd);
                this.activeParks = this.activeParks.filter((log) => {
                    return vehicleToAdd.id != log.id;
                })
            }
        })
        this.updateVehicleCountByHour();
    }

    isVehicleInActiveParking = (vehicleId) => {
        let existingVehicle = this.activeParks.filter((log) => {
            return log.id == vehicleId;
        })
        return existingVehicle;
    }

    restartHours() {
        const timeArray = [];

        let openingTimeHour = this.getHours(this.openingTime);
        let closingTimeHour = this.getHours(this.closingTime);

        let openingHoursSize = closingTimeHour - openingTimeHour;

        for (let i = 0; i <= openingHoursSize; i++) {
            let timeSlot = {
                time: `${openingTimeHour + i}:00:00.000`,
                vehicles: 0
            }
            timeArray.push(timeSlot);
        }

        this.timeSlots = timeArray;
    }

    printHours(){
        console.log(this.timeSlots);
    }

    getHours(time) {
        return Number(time.split(":")[0]);
    }

    updateVehicleCountByHour() {
        this.restartHours();
        this.timeSlots.forEach((timeslot,i)=>{
            this.pastParks.forEach((log)=>{
                let entranceTime = this.getHours(log.entranceTime.split("T")[1]);
                let exitTime = this.getHours(log.exitTime.split("T")[1]);
                if(this.getHours(timeslot.time) >= entranceTime && this.getHours(timeslot.time) <= exitTime){
                    timeslot.vehicles++;
                    if(this.timeSlots[this.busiestHour].vehicles < timeslot.vehicles){
                        this.busiestHour = i;
                    }
                }
            })
        })
    }

    getBusiestHour(){
        return this.timeSlots[this.busiestHour];
    }

    printLog() {
        console.log("------------");
        console.log("Active Parks");
        console.log("------------");
        this.activeParks.forEach((vehicle, i) => {
            console.log(`vehicle ${i + 1}`);
            vehicle.printVehicle();
            console.log("------");
        })

        console.log("----------");
        console.log("Past Parks");
        console.log("----------");
        this.pastParks.forEach((vehicle, i) => {
            console.log(`Vehicle ${i + 1}`);
            vehicle.printVehicle();
            console.log("------");
        })
    }

    nightlyCars() {
        let overnight = 0;
        this.pastParks.forEach((log) => {
            let entranceDay = log.entranceTime.split("T")[0];
            let exitDay = log.exitTime.split("T")[0];
            if(exitDay > entranceDay){
                overnight++;
            }
        })
        return overnight;
    }

    activeVehiclesByType() {
        let vehicleList = Array(3).fill(0);
        this.pastParks.forEach((log) => {
            vehicleList[log.typeValue - 1] += log.parkedMoreThanXHours();
        })
        return vehicleList;
    }
}