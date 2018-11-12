const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
  
const app = express();
const jsonParser = bodyParser.json();
const url = "mongodb://localhost:27017/usersdb";

var main=require('./main');
var calc=main.calc;
console.log(calc.pow2(100));

CreateDB();
function CreateDB(){
    mongoClient.connect(url, function(err, client){
          
        const db = client.db("users2");
        const collection = db.collection("users");
        let user = {login: "login1", password: '123', n1:''};
        collection.insertOne(user, function(err, result){
              
            if(err){ 
                return console.log(err);
            }
            console.log(result.ops);
            client.close();
        });
    });    
}

  
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
       
    console.log('app  insert...'); 
});
app.get("/api/users", function(req, res){
       
    mongoClient.connect(url, function(err, client){
        client.db("users1").collection("users").find({}).toArray(function(err, users){
            res.send(users)
            client.close();
        });
    });
});
app.get("/api/users/:id", function(req, res){
       
    var id = new objectId(req.params.id);
    mongoClient.connect(url, function(err, client){
        client.db("users1").collection("users").findOne({_id: id}, function(err, user){
              
            if(err) return res.status(400).send();
              
            res.send(user);
            client.close();
        });
    });
});
  
app.post("/api/users", jsonParser, function (req, res) {
      
    if(!req.body) return res.sendStatus(400);
      
    var userLogin = req.body.login;
    var userPassword = req.body.password;
    var user = {login: userLogin, password: userPassword, n1:''};
      
/*    res.send(calc.createUserdb(user, function(last) {
  console.log('last'); console.log(last); last
}));*/

    var sendInsert=calc.createUserdb(user);
    console.log('sendInsert'); console.log(sendInsert); 

    res.send(sendInsert);

    /*mongoClient.connect(url, function(err, client){

        client.db("users1").collection("users").find({}).toArray(function(err, users){
            //res.send(users); 
            var extract=users.filter(i=>i['login']==user['login']).length;
            console.log(extract);console.log(!extract);
            if (!extract){
                client.db("users1").collection("users").insertOne(user, function(err, result){                  
                    if(err) return res.status(400).send();
                    res.send(user);
                    client.close();
                });                
            }
            client.close();
        });

    });*/
});
   
app.delete("/api/users/:id", function(req, res){
       
    var id = new objectId(req.params.id);
    mongoClient.connect(url, function(err, client){
        client.db("users1").collection("users").findOneAndDelete({_id: id}, function(err, result){
              
            if(err) return res.status(400).send();
              
            var user = result.value;
            res.send(user);
            client.close();
        });
    });
});
  
app.put("/api/users", jsonParser, function(req, res){
       
    if(!req.body) return res.sendStatus(400);
    var id = new objectId(req.body.id);
    var userLogin = req.body.login;
    var userPassword = req.body.password;
      
    mongoClient.connect(url, function(err, client){
        client.db("users1").collection("users").findOneAndUpdate({_id: id}, { $set: {login: userLogin, password: userPassword}},
             {returnOriginal: false },function(err, result){
              
            if(err) return res.status(400).send();
              
            var user = result.value;
            res.send(user);
            client.close();
        });
    });
});
   
app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});