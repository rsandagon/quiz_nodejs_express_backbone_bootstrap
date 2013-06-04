MOCKDATA for RESTFUL Node js + Express with MongoDb
===================================================


Installation
============
A. Installing Node.js: Go to [http://nodejs.org](Nodejs website), and click install 

B. Install MongoDb : Go to [http://docs.mongodb.org/manual/installation/](MongoDb) or you may use the added bash file mongo_install.bash

C. Install Express Module
	1. Open a shell, cd to this project's file directory, and execute the following command to install the express module: 'npm install'
	2. This will generate a nodecellar folder which will contain the Express modules.

D. Install mongodb driver
	1. execute the command: 'npm install mongodb'
	2. For Ubuntu, you may use the mongo_install.bash  "$ sudo bash ./mongo_install.bash"


How to Run
==========
A. Run "mongod"
B. Run "node service.js". This will run the application in port 3000 and will print something like this:
C. Open your public index.html at localhost:3000.


Notes
=====
To make the node server running continuosly, you may install [https://github.com/nodejitsu/forever](node forever) and run 

	forever start server.js

