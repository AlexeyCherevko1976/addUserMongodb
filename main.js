const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
  
const app = express();
const jsonParser = bodyParser.json();
const url = "mongodb://localhost:27017/usersdb";

;(function() {

  // calc - основная функция для библиотеки
  function calc(value) {
    // ...
  }

  // вспомогательная переменная
  var version = '1.1.1';  
  var baza=[
    {_id: "5be6edaa6da925142cbc1baa", login: "alexey76", password: "2345"},
    {_id: "5be6ede66da925142cbc1bab", login: "vasja01", password: "aaaaaaaaaa"},
    {_id: "5be6ee2c6da925142cbc1bad", login: "login1", password: "a123456"}
    ]; 

  function pow2(value){
  	return value*value
  }

  function createUserdbM(user){

    mongoClient.connect(url, function(err, client){

        client.db("users1").collection("users").find({}).toArray(function(err, users){             
            var extract=users.filter(i=>i['login']==user['login']).length;
            console.log(extract);console.log(!extract);
            if (!extract){
                client.db("users1").collection("users").insertOne(user, function(err, result){                  
                    if(err) return res.status(400).send();
                    return user;
                    client.close();

                });                
            }
            client.close();
            //return user;
        });

    });    
  }

  function createUserdb(user){
    
    

        mongoClient.connect(url, function(err, client){
 
          client.db("users1").collection("users").insertOne(user, function(err, result){                  
              //if(err) return res.status(400).send();
              console.log('client.db'); console.log(user); 

              //console.log(user);
              client.close();

          });
                
        });  

  
//console.log('answer'); console.log(answer);
  }

  calc.pow2=pow2;
  calc.createUserdb=createUserdb;

  module.exports.calc=calc;
}());