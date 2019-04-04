# TP_sevenWonders 
### Groupe Alexandre Mollaret, Alban Denizot, David Seroussi, Léo Le Hénaff

## First thing to do:
Install NodeJS:
+ For linux:
	```
	curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
	sudo apt install -y nodejs
	```
+ For Windows:
	Go and visit this [website](https://nodejs.org/en/download/). Donwload the lastest version of NodeJS for your system architecture

## Install yarn for your operating system:
+ For linux: 
	```
	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg
	sudo apt-key add -
	echo "deb https://dl.yarnpkg.com/debian/ stable main"
	sudo tee /etc/apt/sources.list.d/yarn.list
	sudo apt update && sudo apt install -y yarn
	```
+ For Windows : Go to the this website : [Yarn](https://yarnpkg.com/fr/docs/install#windows-stable) and download the installer.
This will not work without NodeJS.

## Project execution:
 
 + Open the project in your IDE after you've run the command: ```git clone ```. This will download the project in your current working space.
 + Open the terminal avaible in your IDE. If you are using linux you can also use the classic UNIX terminal.
 + Run this command to install node_modules :
 	```
 	yarn install
 	```

## X0 Linting
+ Run this command in your IDE terminal or in the UNIX terminal:
 	```
 	yarn xo
 	```
+ If you have errors:
 	```
 	yarn xo --fix
 	```

## Program test	
 + First check that your devinity.test.js file is located in the test folder. If not create a folder and drag and drop it in the new folder.
 + Now run this command to test the program: 
 	```
 	yarn test
 	xo && mocha
 	```
 + You should return 0 errors.


