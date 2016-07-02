var express    = require("express");
var bodyParser = require("body-parser");
var app        = express();
var fs         = require("fs");



// fs.writeFile(__dirname + '/data/posts1.json', function (error, file){
//   console.log(error);

// });

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/home", express.static("public"));

app.get("/get-posts", function(req, res) {
  fs.readFile(__dirname + '/data/posts.json', function (error, file) {
      var parsedFile = JSON.parse(file);
      res.send(parsedFile);
    });
});

app.post("/create-post", function(req, res) {
  fs.readFile(__dirname + '/data/posts.json', function (error, file) {
      var parsedFile = JSON.parse(file);
      parsedFile[Date.now()] = req.body['blogpost'];

  fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(parsedFile), function(error, file){
    console.log(error);
  });
      res.redirect('/home');
  });
});

// app.post("/create-post", function(req, res) {
//   fs.appendFile(__dirname + '/data/posts.json', function (error, file) {
//     console.log(file);
//   res.redirect("/home");
// });
// });


app.listen(3000, function() {
  console.log("this is an anonymous callback function that's called when port 3000 is working");
});