/* create the db and tables, then close*/

const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("../db/poolsinfos.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if(err)
  {
    return console.error(err.message);
  }
  else {
    console.log("success");
  }

})

db.run('CREATE TABLE poolsElements(pieceID INTEGER PRIMARY KEY NOT NULL, clientid NUMBER,pool TEXT, style TEXT, size NUMBER, title TEXT, keywordone TEXT, keywordtwo TEXT, keywordthree TEXT, text TEXT, speed NUMBER, positionx NUMBER, positiony NUMBER, directionx NUMBER, directiony NUMBER,connectedto TEXT)', (err) =>{
  if(err)
  {
    return console.error(err.message);
  }
  else {
    console.log("created table poolsElements");
  }

});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
