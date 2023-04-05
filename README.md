The techstack used in this application is Express.js, Typeorm and Mysql. 

The application is bootstraped using the cli command 
typeorm init --name [project-name] --database mysql --express


create a database with the name of test in your local machine

ROUTES

1. Camera Routes

GET http://localhost:3000/camera/

GET http://localhost:3000/camera/:id 

POST http://localhost:3000/camera/ -------------> requires a body 

PUT http://localhost:3000/camera/:id -------------> requires a body 

DELETE http://localhost:3000/camera/:id

2. Camera Network Routes

GET http://localhost:3000/camera-network/

GET http://localhost:3000/camera-network/:id

POST http://localhost:3000/camera-network/ -------------> requires a body 

PUT http://localhost:3000/camera-network/:id -------------> requires a body 

DELETE http://localhost:3000/camera-network/:id

