// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            res.send(data);
        }
    });
});

app.post('/comments', (req, res) => {
    fs.readFile(commentsPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            let comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));