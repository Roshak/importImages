const express = require('express');
const app = express();
const http = require('http').Server(app).listen(3000);
const upload = require('express-fileupload');

app.use(upload());

console.log('Server Started');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/');
});

app.post('/', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  image = req.files.cameraimg;
  uploadPath = __dirname + '/upload/' + image.name;

  console.log(uploadPath);
  image.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);
    return res.sendFile(__dirname + '/');
  });
});
