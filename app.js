require("dotenv").config();
const webpack = require('webpack');
const express = require('express')
const bodyParser = require("body-parser");
const router = express.Router();
const app = express()
const port = 5000
var cors = require('cors')

var ngrokFront = process.env.REACT_APP_ngrokFront

/*
module.exports = {
    webpack: (config) => {
      const env = {  };
      config.plugins.push(new webpack.DefinePlugin(env));
      return config;
    },
  }*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://"+ngrokFront+".ngrok.io/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.options('/handle', cors())


var mysql = require('mysql');
console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
console.log(process.env.dbpassword);

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.dbpassword,
    database: "compta_kraiss"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


router.put('/handle', cors(), (req, res, next) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
    console.log(req.body);


  /*  con.query("SELECT * FROM orders", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });*/

      var sql = "UPDATE orders SET order_state = 2 WHERE order_id=1";
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