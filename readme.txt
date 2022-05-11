STRUCTURE: 

CHALLENGE-BACKEND
server  - config    - db.js
                    - middleware.js
                    - congig.env

        - modules   -  users  - index.js
                              - model.js
                              - routes.js
        - index.js        
        - utils - geocoder.js
index.js 
uploads - all uploaded thumbnails


For Geo used Geocoder Mapquest Api key
Thumbnail upload used multer


To run the app :
npm install
npm start

Connected to mongoDB

APIS

POST
/api/adduser


GET
/api/getallusers
/api/getallusers/id/:id


DELETE
/api/deleteuser/id/:id
/api/deleteusers