const express = require("express");
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs")

app.get("/", function(req,res){
    fs.readdir('./notefile', function(err, files){
        res.render("index", {files : files});
    })
});
app.get("/files/:filename", function(req,res){
    fs.readFile(`./notefile/${req.params.filename}`, "utf-8", function(err, filedata){
        res.render("details", {filedata : filedata, filename : req.params.filename})
    });
    
});
app.post("/create", function(req,res){
    fs.writeFile(`./notefile/${req.body.title.split(' ').join('')}.txt`, req.body.content, function(err){
        res.redirect("/");
    });
});


app.listen(3000);