var express = require('express');
var fs = require('fs');
var multer = require('multer');
var fileUpload = require('express-fileupload');
//var upload = multer({ dest: 'documents/' });
var https = require('https');
var http = require('http');
var Jimp = require('jimp');
var path = require('path');
var app = express();
var app2 = express();
var bodyParser = require('body-parser');
//var axios = require('axios');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var exec = require('child_process').exec;
//var uuid = require('uuid/v1')
var buffer = new Buffer('', 'base64');
var buffer2 = new Buffer('', 'base64');
var mime = Jimp.MIME_JPEG;
var image = "";
var url = "mongodb://localhost:27017";
var dbName = "sample";
var ergebnis = "";
var resultId = "";
var msg = "";
var resultat = "";
var uid = "";

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}


var Storage = multer.diskStorage({
    destination: function (req, file, callback) {

        callback(null, "./documents/")

    },
    filename: function (req, file, callback) {

        callback(null, uid + file.originalname);
       
    }
});

var upload = multer({
    storage: Storage
});

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(fileUpload());
app.use('/', express.static(__dirname + '/html'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/jquery-ui', express.static(__dirname + '/jquery-ui'));
app.use('/logo', express.static(__dirname + '/logo'));
app.use('/Docs', express.static(__dirname + '/Docs'));
app.use('/admin', express.static(__dirname + '/documents'));
app.use('/vendor', express.static(__dirname + '/vendor'));


app.get('/', function(req, res){
  res.sendFile('index.html', {root:__dirname + '/html'})
})

app2.get('/image.jpg', function(req, res){
  res.setHeader('content-type','image/jpeg');
  res.send(buffer2);
//  res.send("Hello Wolrd!!");
})

app.post('/uuid', function (req, res) {
    console.log("UUID is: " + req.body.id)
    uid = req.body.id
    res.send("done")
});



app.post('/type', function(req, response){
    var types = {}
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        
        var db = client.db(dbName);
        
     
        //var query = {"_id" : "abcd1"}
                  
        db.collection("TKType").find().toArray(function (err, res) {
            if (err) throw err;
           
           //console.log(res)
           types =   res
         
          //  console.log(typeof(res[0].logbook))
            
          response.send(JSON.stringify(types))
       //   console.log(JSON.stringify(types))
            
            
            
        })
        client.close();
    });
    
  })




    app.post('/typ', function(req, response){

        console.log(req.body.type_name)
        var type = req.body.type_name

        MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            
            var db = client.db(dbName);
            
         
            var query = {"type_name" : type}
                      
            db.collection("TKType").find(query).toArray(function (err, res) {
                if (err) throw err;
               
               console.log(res)
               console.log(typeof(res))
               types =   res
             
              //  console.log(typeof(res[0].logbook))
                
              response.send(JSON.stringify(types))
              console.log(JSON.stringify(types))
                
                
                
            })
            client.close();
       
      
      })

    })







app.post('/id', function (req, res) {
    var id = req.body.id;
    console.log("Received id:" + id);
     
    // res.send(id);
      

      MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
          assert.equal(null, err);
          console.log("Connected successfully to server");
          //   if (resFinal !== "") {
          var db = client.db(dbName);
          /* "C0:E5:4E:02:85:B8"*/
          console.log("dbname is: " + dbName);
          var query = { _id: id };
          //   console.log("String is: " + JSON.stringify(query));
          console.log("Query is: " + query._id);
          db.collection("TKKompnente").find(query).toArray(function (err, result) {
              if (err) throw err;
              ergebnis = JSON.stringify(result);
              res.send(ergebnis);
              console.log("result is: " + JSON.stringify(result));
          })
          /*  } else {
              console.log("Please wait!");
          }*/
          client.close();
          
      });
})


app.post('/mid', function (req, res) {
    var id = req.body.id;
    console.log("Received id:" + id);
      res.send(ergebnis);
    // res.send(id);
      

      MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
          assert.equal(null, err);
          console.log("Connected successfully to server");
          //   if (resFinal !== "") {
          var db = client.db(dbName);
          /* "C0:E5:4E:02:85:B8"*/
          console.log("dbname is: " + dbName);
          var query = { _id: id };
          //   console.log("String is: " + JSON.stringify(query));
          console.log("Query is: " + query._id);
          db.collection("TKKompnente").find(query).toArray(function (err, result) {
              if (err) throw err;
              ergebnis = JSON.stringify(result);
              console.log("result is: " + JSON.stringify(result));
          })
          /*  } else {
              console.log("Please wait!");
          }*/
          client.close();
          
      });
})


app.post('/admin', function (req, res)  {
    var recData = req.body;
   // console.log(recData);
   // res.send("done");
    res.sendFile('ans.html', { root: __dirname + '/html' })
})

app.post('/admin/docs', upload.array('docs', 12), function (req, res) {
    console.log( req.file);
    res.send("File is uploaded");

}) 


app.post('/admin/save', function (req, res) {
    var recData = req.body;
    console.log("Received data :- " + JSON.stringify(recData));
    res.send("done from admin2");


    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        
        var db = client.db(dbName);
        
     
        var myObj = recData;
        db.collection("TKKompnente").insertOne(myObj, function (err, res) {
            if (err) throw err;
            console.log("One doc inserted successfully");
        })
        client.close();
    });

})


app.post('/admin/doc/del', function (req, res) {
    var recId = req.body._id;
    console.log("dId is " + recId);
    res.send(msg);
    // res.sendFile('del.html', { root: __dirname + '/html' })

    var filePath

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        var db = client.db(dbName);


        var query = { "_id": recId }

        db.collection("TKKompnente").find(query).toArray(function (err, res) {
            if (err) throw err;
            console.log(res[0].logbook);
            console.log(res[0].logbook.length);

            for (var i = 0; i < res[0].logbook.length; i++) {
                console.log(res[0].logbook[i].toString().search("admin"));
                var str = res[0].logbook[i].toString()
                var startingPoint = res[0].logbook[i].toString().search("admin")
                console.log(str.indexOf(",", startingPoint))
                var endPoint = str.indexOf(",", startingPoint)
                console.log(str.slice(startingPoint + 6, endPoint))
                var finalString = str.slice(startingPoint + 6, endPoint)
                filePath = "./documents/" + finalString

                fs.unlink(filePath, function (err, res) {
                    if (err) throw err;
                    console.log("One file deleted successfully");
                }) 
            } 

            //  console.log(typeof(res[0].logbook))





        })
        client.close();
    });
})


app.post('/admin/del', function (req, res) {
    var recId = req.body._id;
    console.log("dId is " + recId);
    res.send(msg);
   // res.sendFile('del.html', { root: __dirname + '/html' })


    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        var db = client.db(dbName);

        var myObj = {
            _id : recId
        }
        db.collection("TKKompnente").deleteOne({ "_id": recId }, { justOne: true }, function (err, res) {
            if (err) {
                throw msg = err;
            }else{
            console.log("One doc deleted seúccessfully");
            msg = "Gewuenschte Komponente wurde erfolgreich geloescht";
            }
        })
        client.close(); 
    });

})


app.post('/admin/update', function (req, res) {
    var recData = req.body;
    console.log(recData);
    res.send("done from admin2");


    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        var _id = recData._id;

        var db = client.db(dbName);
       
        var myObj = recData;

        
        db.collection("TKKompnente").updateOne({ "_id": _id },
                                       {$set: myObj}, function (err, res) {
            if (err) throw err;
            console.log("One doc updated successfully");
        })
        client.close();
    });

})

app.post('/admin/id', function (req, res) {
    if (req !== null) {

    
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        var db = client.db(dbName);

        db.collection("TKKompnente").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            resultId = result;
        })
       
    })
    }
    res.send(resultId);
})
    
app.delete('/admin/cam/del', function (req, res) {
    var imgString = req.body.data;
    buffer = new Buffer(imgString, 'base64');
    res.send(msg);

    Jimp.read(buffer)
    .then(image => {
        return image
        .greyscale()
        .resize(250, Jimp.AUTO, Jimp.RESIZE_NEAREST_NEIGHBOUR)
         .normalize()
     //   .write('image1.jpg')
         .getBuffer(mime, function (err, img) {
             if (err) {
                 throw err;
             } else {
                 buffer2 = img;
             }

         })

    })


    var childOutput = exec('java -cp "./zxing/javase/javase-3.3.3.jar;./zxing/javase/jcommander-1.72.jar;./zxing/core/core-3.3.3.jar" com.google.zxing.client.j2se.CommandLineRunner http://localhost:3001/image.jpg',
      function(err, stdout, stderr){
  
          if(err !== null) {
              console.log("Error->" + err);
              res.send("\"Error\"");
          }else{
              var result = stdout.slice(33);
             
              //   res.send(ergebnis);
              // console.log(result.replace(/\s/g, ''));
              var ans = result.replace(/\s/g, '');
              var pos = ans.search("Parsedresult");
              //  var res = ans.slice(pos);

              var posFinal = ans.search("Found4resultpoints");
              var resFinal = ans.slice(pos + 13, posFinal);
              console.log(resFinal);


              MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
                  assert.equal(null, err);
                  console.log("Connected successfully to server");

                  var db = client.db(dbName);

                  var myObj = {
                      _id: resFinal
                  }
                  db.collection("TKKompnente").deleteOne(myObj, function (err, res) {
                      if (err) {
                          throw msg = err;
                      } else {
                          console.log("One doc deleted seúccessfully");
                          msg = "Gewuenschte Komponente wurde erfolgreich geloescht";
                      }
                  })
                  client.close();
              });
          }
      })

})

    app.post('/img', function(req, res){
        var imgString = req.body.data;
        buffer = new Buffer(imgString, 'base64');
        
        Jimp.read(buffer)
        .then(image => {
            return image
            .greyscale()
            .resize(250, Jimp.AUTO, Jimp.RESIZE_NEAREST_NEIGHBOUR)
             .normalize()
         //   .write('image1.jpg')
             .getBuffer(mime, function (err, img) {
                 if (err) {
                     throw err;
                 } else {
                     buffer2 = img;
                 }
             
             })
        
        })
   
       

        var childOutput = exec('java -cp "./zxing/javase/javase-3.3.3.jar;./zxing/javase/jcommander-1.72.jar;./zxing/core/core-3.3.3.jar" com.google.zxing.client.j2se.CommandLineRunner http://localhost:3001/image.jpg',
        function(err, stdout, stderr){
  
            if(err !== null) {
                console.log("Error->" + err);
                res.send("\"Error\"");
            }else{
                var result = stdout.slice(33);
                resultat = ergebnis;
                              
               
                //   res.send(ergebnis);
                // console.log(result.replace(/\s/g, ''));
                var ans = result.replace(/\s/g, '');
                var pos = ans.search("Parsedresult");
                //  var res = ans.slice(pos);

                var posFinal = ans.search("Found4resultpoints");
                var resFinal = ans.slice(pos + 13, posFinal);
                console.log(resFinal);


                MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
                    assert.equal(null, err);
                    console.log("Connected successfully to server");
                    //   if (resFinal !== "") {
                    var db = client.db(dbName);
                    /* "C0:E5:4E:02:85:B8"*/
                    console.log("dbname is: " + dbName);
                    var query = { _id: resFinal };
                    //   console.log("String is: " + JSON.stringify(query));
                    console.log("Query is: " + query._id);

                    if (resFinal == "n") {
                        ergebnis = JSON.stringify([]);
                        res.send(ergebnis);
                    } else {
                        db.collection("TKKompnente").find(query).toArray(function (err, result) {
                            if (err) throw err;
                            if (JSON.stringify(result) == "[]") {
                                
                                ergebnis = JSON.stringify("No_Object_for_" + query._id);
                                console.log("Object does not exist for " + query._id);
                                res.send(ergebnis);

                            } else {
                                
                             //   ergebnis = "";
                                ergebnis = JSON.stringify(result);
                                console.log("Result is: " + ergebnis);
                                res.send(ergebnis);
                            }
                        })
                    }
                   
                    resultat = "";
                   
                    client.close();
                });

            }

    
        })
    }) 




    






 
    var server = http.createServer( app);
    console.log('Listening at Port 8080');
    server.listen(8080);

    var server2 = http.createServer(app2);
    console.log('Listening at Port 8081');
    server2.listen(8081);

