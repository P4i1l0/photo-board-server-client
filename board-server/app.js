const fs = require('fs')
const cors = require('cors')
const express = require('express')
const path = require('path');
const multer = require('multer')
const mysql = require('mysql');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'img');
        },
        filename: function (req, file, cb) {
            var newFileName = new Date().valueOf() + path.extname(file.originalname)
            cb(null, newFileName);
        }
    }),
})
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '21771126!',
  database : 'board-api'
});
connection.connect();
const app = express()
app.use(cors())

app.get('/photo', (req, res) => {
    const src = req.query.src
    res.sendFile(__dirname + '/img/' + src)
})

app.post('/upload', upload.single('myFile'), (req, res) => {
    const fileName = req.file.filename
    const type = req.body.type
    const date = new Date().toString()
    const location = req.body.loc
    const password = req.body.password
    if (password == "21771126!"){
        if (type == "pano" || type == "height" || type == "width"){
            connection.query("insert into `board-api`.image (image_src, image_type, upload_date, location) value (?, ?, ?, ?)", [fileName, type, date, location], function (error, results, fields){
                if (error){
                    res.send(error)
                }else{
                    res.status(201).end()
                }
            });
        }
        else{
            res.status(400).end()
        }
    }else{
        res.status(401).end()
    }
})

app.get('/photos/:type', (req, res) => {
    if (req.params.type == "pano"){
        connection.query("SELECT * FROM `board-api`.image where image_type = 'pano';", function (error, results, fields){
            if (error){
                res.send(error)
            }else{
                res.send(results)
            }
        });
    }else if (req.params.type == "height"){
        connection.query("SELECT * FROM `board-api`.image where image_type = 'height';", function (error, results, fields){
            if (error){
                res.send(error)
            }else{
                res.send(results)
            }
        });
    }else if (req.params.type == "width"){
        connection.query("SELECT * FROM `board-api`.image where image_type = 'width';", function (error, results, fields){
            if (error){
                res.send(error)
            }else{
                res.send(results)
            }
        });
    }else{
        res.status(400).end()
    }
})

app.listen(3000)