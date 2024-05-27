export class Vehicle{
    constructor(id = '', typeName, timestamp = '', action = ''){
        this.id = id;
        this.typeName = typeName;
        this.action = action;
        let timestampZIndex = timestamp.lastIndexOf("Z");
        if(timestampZIndex != -1){
            timestamp = timestamp.slice(timestampZIndex,1);
        }
        if(action == 'ENTRANCE'){
            this.enter(timestamp);
        }
        else if (action == 'EXIT'){
            this.exit(timestamp);
        }
    }
    
    #type = Object.freeze({
        'MOTORCYCLE' : 1,
        'CAR' : 2,
        'TRUCK' : 3
    })

    get typeValue(){
        return this.#type[this.typeName];
    }

    enter(timestamp){
        this.entranceTime = timestamp;
    }
    exit(timestamp){
        this.action = "EXIT";
        this.exitTime = timestamp;
    }

    timeSpentInPark(){
        let exitHour = new Date(this.exitTime);
        let enterHour = new Date(this.entranceTime);
        return exitHour.getHours() - enterHour.getHours(); 
    }

    printVehicle(){
        console.log(`Vehicle id: ${this.id}`);
        console.log(`Vehicle type: ${this.typeName}`);
        console.log(`Vehicle Entrance time: ${this.entranceTime}`);
        if(this.exitTime != undefined){
            console.log(`Vehicle Exit time: ${this.exitTime}`);
            console.log(`Time spent in parking lot: ${this.timeSpentInPark()} hours`);
        }
    }

    parkedMoreThanXHours(){
        if(this.timeSpentInPark() > this.#type[this.typeName]){
            return 1;
        }
        return 0;
    }

    printType(){
        console.log(`${this.#type[this.typeName]}`);
    }
}