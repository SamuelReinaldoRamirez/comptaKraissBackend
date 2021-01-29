const express = require('express')
const bodyParser = require("body-parser");
const router = express.Router();
const app = express()
const port = 5000

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "compta_kraiss"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


router.put('/handle',(req, res) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
    console.log(req.body);


  /*  con.query("SELECT * FROM orders", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });*/

      var sql = "UPDATE orders SET order_state = 6 WHERE order_id=1";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
      res.send('this is an update')

    /*  con.query("SELECT * FROM orders", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
      });*/
});

// add router in the Express app.
app.use("/", router);


app.get('/', (req, res) => res.send('Hello World'));



function getStateOrderdb(id, callback){

    con.query("SELECT * FROM orders", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log(result[1].order_state);
        resultat = result;
        if(err){ return callback(err) };
        console.log('result')
        console.log(result)
        var obj = result // or something
        console.log('obj')
        console.log(obj)
      callback(null, obj)
    });
  };
  


app.get('/getStateOrder', (req, res) => {
        console.log("Connected!")
        var resultat;

        getStateOrderdb('something', function(err, obj){
            if(err){ return next(err) };
            res.myObj = obj;
            console.log('obj dans callback')
            console.log(obj)
            res.send(obj)
           // next();
          });

});

app.listen(port, () => console.log(`exampe port ${port}`))