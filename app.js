require("dotenv").config();
const webpack = require('webpack');
const express = require('express')
const bodyParser = require("body-parser");
const router = express.Router();
const app = express()
const port = 5000
var cors = require('cors')

var ngrokFront = process.env.REACT_APP_ngrokFront


 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
// POST /login gets urlencoded bodies
/*app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username)
})*/

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
  app.options('/getStateOrder', cors())


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

  // add router in the Express app.
app.use("/", router);


app.get('/', (req, res) => res.send('Hello World'));


router.put('/handle', cors(), (req, res, next) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
    console.log("PUTT")
    //permet de récupérer le body
    console.log(req.body);
    //permet de recuperer les request params
    console.log(req.query)


  /*  con.query("SELECT * FROM orders", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });*/

      var sql = "UPDATE orders SET order_state ="+ req.body.order_state +" WHERE order_id="+req.query.id;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
      });
      res.send('this is an update')
});

router.get('/getStateOrder', cors(), (req, res, next) => {
      console.log("res!")
      console.log(res)
      var resultat;
      var a = 'something'

      con.query("SELECT * FROM orders", function (err, result, fields) {
        if (err) {throw err};
        if(err){ return next(err) };
        //console.log(result);
        //console.log(result[1].order_state);
        resultat = result;
        //console.log('result')
        //console.log(result)
        var obj = result // or something
        console.log('obj')
        console.log(obj)

        res.myObj = obj;
        console.log('obj dans pu callback')
        console.log(obj)
        res.send(resultat)
      });
        
        //next();
      });



/* 
function getStateOrderdb(id, callback){

    con.query("SELECT * FROM orders", function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        //console.log(result[1].order_state);
        resultat = result;
        if(err){ return callback(err) };
        //console.log('result')
        //console.log(result)
        var obj = result // or something
        console.log('obj')
        console.log(obj)
        callback(null, obj)
    });
  };

router.get('/getStateOrder', cors(), (req, res, next) => {
        console.log("res!")
        console.log(res)
        var resultat;
        var a = 'something'
        getStateOrderdb(a, function(err, obj){
            if(err){ return next(err) };
            res.myObj = obj;
            console.log('obj dans callback')
            console.log(obj)
            res.send(obj)
            next();
          });

});*/


app.listen(port, () => console.log(`exampe port ${port}`))