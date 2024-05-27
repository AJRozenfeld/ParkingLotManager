import { Vehicle } from './Vehicle.mjs';
import { LogManager } from './LogManager.mjs';
import * as fs from 'fs';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

const readJson = (fileAddress) => {
    try {
        let data = fs.readFileSync(fileAddress);
        let jsonData = JSON.parse(data);
        return jsonData;
    }
    catch (error) {
        console.error(`Error reading the file: ${error}`);
    }
}

const systemConfig = readJson('./systemConfig.json');
let logManager;

const readLogs = () => {
    let logs = readJson(systemConfig.logFileName);
    let openingTime = systemConfig.openingTime;
    let closingTime = systemConfig.closingTime;
    logManager = new LogManager(openingTime, closingTime);
    logs = checkLogForErrors(logs);
    logManager.addToLog(logs);
}

const checkLogForErrors = (logs) => {
    let validLogs = logs.filter((log) => {
        return log.length == 4 &&
            typeof (log[0]) == 'string' && Number(log[0]) == log[0] &&
            log[1] == 'TRUCK' || log[1] == 'CAR' || log[1] == 'MOTORCYCLE' &&
            new Date(log[2]).toString() == log[2]&&
            log[3] == "EXIT" || log[3] == "ENTRANCE"
    })
    return validLogs;
}

//#region Terminal work
const mainScreen = async () => {
    let username = systemConfig.username;
    let password = systemConfig.password;
    await login(username, password);
    showSelectionScreen();
    await menuChoice();
    rl.close();
}

const login = async (username, pass) => {
    console.log(`Welcome, ${username}`);
    while (true) {
        const password = await askQuestion('Enter password: ');
        if (password == pass) {
            console.log('Access Granted');
            break;
        }
        else {
            console.log('Access Denied. Try again');
        }
    }
}

const menuChoice = async () => {
    while (true) {
        const choice = await askQuestion('Type in the number of your choice (type exit to end)\n');
        if (Number(choice) < 0 || Number(choice) > 7) {
            console.log('invalid choice. try again');
        }
        else if (choice != 'exit') {
            printChoice(Number(choice));
        }
        else {
            rl.close();
            break;
        }
    }
}

const showSelectionScreen = () => {
    console.clear();
    console.log("Main Menu");
    console.log("----------");
    console.log("1. Show logs");
    console.log("2. How many Vehicles have spent more than X hours by type of Vehicle?");
    console.log("3. How many Vehicles have spent the night?");
    console.log("4. How many Vehicles currently in the parking lot?");
    console.log("5. Show busiest hour");
    console.log("6. Update logs from JSON");
}

const printChoice = (choice) => {
    switch (choice) {
        case 1:
            logManager.printLog();
            break;
        case 2:
            let parkedVehiclesByType = logManager.activeVehiclesByType();
            console.log(`Motorcycles: ${parkedVehiclesByType[0]}`);
            console.log(`Cars: ${parkedVehiclesByType[1]}`);
            console.log(`Trucks: ${parkedVehiclesByType[2]}`);
            break;
        case 3:
            console.log(`Amount of cars spent the night: ${logManager.nightlyCars()}`);
            break;
        case 4:
            console.log(`Amount of vehicles currently in the parking lot: ${logManager.activeParks.length}`);
            break;
        case 5:
            let busiestHour = logManager.getBusiestHour();
            console.log(`Busiest hour: ${busiestHour.time} | Vehicles parking at the time: ${busiestHour.vehicles}`);
            break;
        case 6:
            try {
                readLogs();
                console.log('logs updated');
            }
            catch (e) {
                console.error(e);
            }
            break;
        case 7:
            logManager.printHours();
            break;
    }
}

const askQuestion = (query) => {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        })
    })
}

//#endregion


console.clear();
readLogs();
mainScreen();