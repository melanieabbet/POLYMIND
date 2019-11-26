const sqlite3 = require('sqlite3').verbose();
//just Connected
exports.establishConnection = function(){
let db = new sqlite3.Database("./db/poolsinfos.db", sqlite3.OPEN_READWRITE, (err) => {
    if(err)
    {
      return console.error(err.message);
    }
    else {
      console.log("success");
    }

  })
  return db;
}

// insert
exports.putData = function(db,data) {
        return new Promise(( resolve, reject ) => {
            let sqlInsert = `INSERT INTO poolsElements (clientid, pool, style, size, title, keywordone, keywordtwo, keywordthree, text, speed, positionx, positiony, directionx,directiony,connectedto) VALUES ('${data.clientid}','${data.pool}','${data.style}','${data.size}','${data.title}','${data.keywordone}','${data.keywordtwo}','${data.keywordthree}','${data.text}','${data.speed}','${data.positionx}','${data.positiony}','${data.directionx}','${data.directiony}','${data.connectedto}')`;
            console.log("data::"+data)
            db.run(sqlInsert, (err) =>{
              if(err) return reject( err );
              resolve("inserted entry");
            });
      });
  };

  exports.fetchData = function(db,theQuery) {
          return new Promise(( resolve, reject ) => {
              //using the all
              db.all(theQuery, [], (err, resultSet) => {
                if(err) return reject( err );
                //return the resultSet
                  resolve( resultSet);
              });
            });
          };
