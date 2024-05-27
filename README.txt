							------------
							INSTRUCTIONS
						        ------------
Configuration:
--------------

1. Inside the root folder, you'll find a file called "systemConfig.json", this simple file sets up 3 things:
Your "username", your "password", and the filename for the logs file[2].
Edit them to your desire, the app will automatically update itself upon initialization appropriately to the input you put in the systemConfig.json file.

2. Also, inside the root folder, you'll find the "vehicleLogs.json" file, which contains the logs for your vehicles. whenever you want to add a new vehicle to your logs, simply 
put a new item(in the form of an array item, i.e between two []), where the first parameter should always be the vehicle ID, the second parameter its type, the third parameter the time, and the fourth is whether the vehicle's action is ENTER \ EXIT.
logs that do not follow the format will be ignored.

After putting new vehicles in the vehicleLogs file(or whatever you choose to call it), don't forget to update the logs on the app, which can be done through the main menu, or by closing it, and re-opening it.


Running:
--------

1. This app runs on NodeJS package manager, which means it requires an installation of node, and npm. Instructions for both are very simple and can be found at: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

2. once you have node and npm installed, run a command prompt on the directory of the folder(highlight the url bar, and type in 'cmd') and run the command npm start. From there,
all you have to do is put in your password, and follow the instructions.