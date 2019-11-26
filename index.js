const dataDBAccess = require('./dbScripts/DBAccess.js');
const bodyParser = require("body-parser");

let express = require('express');
const portNumber =process.env.PORT|| 5000;
let app = express(); //make an insatnce of express
let httpServer = require('http').createServer(app);
// serving static files
let static = require('node-static'); // for serving static files (i.e. css,js,html...)
// declare io which mounts to our httpServer object (runs on top ... )
let io = require('socket.io')(httpServer);

let clientIdIncrementing =100;
let clientIds =[];
let numberchoice;
let poolname;
let poolchoice;

app.use(bodyParser.urlencoded({
    extended: false
}));

//use json when getting data from an AJAX post request
app.use(bodyParser.json());
// serve anything from this dir ...
app.use(express.static(__dirname + '/public'));

// for the client...
app.use(express.static(__dirname + '/node_modules'));

// create a server (using the Express framework object)
// make server listen for incoming messages
httpServer.listen(portNumber, function(){
  console.log('listening on port:: '+portNumber);
})



io.on('connection', function(socket){

  let db = dataDBAccess.establishConnection();

  app.get('/insert', requestHandlerInsert);
  function requestHandlerInsert(){
  response.sendFile(__dirname + '/public/index.html');
  }
  app.get('/display', requestHandlerDisplay);
  function requestHandlerDisplay(){
 response.sendFile(__dirname + '/public/pool.html');
}

  app.post('/insertEndPoint', function(req, res){
    const postBody = req.body;
    // INSERT DATA INTO DB
    console.log(postBody);
   //test data::
    //let data = {'artist':'Sabine','title':"Pineapple dream",'creationDate':"2002-09-03",'geoLoc':"montreal",'descript':"test decript",'image':"../public/images/alternative-paris-tours.jpg"};

    // lets do a test insert ...
    //use a promise - to only execute this when we are done  getting the data
    dataDBAccess.putData(db,postBody).then(result => {

      //essai envoi data to pool pour afficher/une fois data recut envoyer to pool signal afficher
      socket.broadcast.emit('elementtodisplay', postBody);
        //do something with the result
       console.log("here:: "+result);
       res.send(JSON.stringify({message:'insert successful'}));
    })
    .catch(function(rej) {
        //here when you reject the promise
        console.log(rej);
      });

  });



  app.post('/displayEndPoint', function(req, res){
    const postBody = req.body;
    ///INSERT DATA INTO DB //WE COULD HAVE PARAMETERS

    // do a test query and put result into console...

  //let theQuery = `SELECT * FROM poolsElements`;
  let theQuery = "SELECT DISTINCT pool FROM poolsElements";
    //use a promise - to only execute this when we are done  getting the data
    dataDBAccess.fetchData(db,theQuery).then(resultSet => {
      /*do something with the result
        for(var i=0; i< resultSet.length; i++)
        {
         console.log("title:: "+resultSet[i].title);
         console.log("artist:: "+resultSet[i].artist);
       }*/
       socket.broadcast.emit('poolsnametodisplay', theQuery);
       console.log(resultSet);
       res.send(JSON.stringify(resultSet));
  })
  .catch(function(rej) {
      //here when you reject the promise
      console.log(rej);
    });
  });

  socket.on('poolchoice',function(data){
   poolchoice = data;
   console.log(poolchoice);
  });
  app.post('/displayEndPointtwo', function(req, res){
    const postBody = req.body;
    ///INSERT DATA INTO DB //WE COULD HAVE PARAMETERS

    // do a test query and put result into console...

  //let theQuery = `SELECT * FROM poolsElements`;
  let theQuery = "SELECT * FROM poolsElements";
    //use a promise - to only execute this when we are done  getting the data
    dataDBAccess.fetchData(db,theQuery).then(resultSet => {
      /*do something with the result
        for(var i=0; i< resultSet.length; i++)
        {
         console.log("title:: "+resultSet[i].title);
         console.log("artist:: "+resultSet[i].artist);
       }*/
       socket.broadcast.emit('poolsnametodisplay', theQuery);
       console.log(resultSet);
       res.send(JSON.stringify(resultSet));
  })
  .catch(function(rej) {
      //here when you reject the promise
      console.log(rej);
    });
  });





    socket.on('Pooljoin', function (data) {
      clientIdIncrementing++;
     // send back the id
     socket.emit('joinedClientPoolId', clientIdIncrementing);
     console.log('a new pool with id ' + clientIdIncrementing + " has entered");
     //keep track of the ids
     clientIds.push({id:clientIdIncrementing,socketId:socket.id});
  });

  socket.on("joinuser", function(data){
     let number = data;
    console.log("myId "+ number);
    clientIds.push({id:number,socketId:socket.id});
  });

  socket.on('numberchoice', function(data){
    numberchoice = data.usernumber;
    poolname = data.poolname;
    console.log('the number of user is ' + data.usernumber + 'the pool name is ' + data.poolname);
  });
  socket.emit('numberchoiceserver', numberchoice);
  socket.emit('poolnamechoiceserver', poolname);





});


//default route
app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

//make a route to test page...
app.get('/anima', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/pool', function(req, res) {
    res.sendFile(__dirname + '/public/pool.html');
});
