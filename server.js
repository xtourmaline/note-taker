const express = require("express");
const path = require('path');
const db = require("./db/db.json");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get('/api/notes', (req, res) =>
    fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
        if (err) {
            console.log("error");
            return;
        }
        res.json(JSON.parse(data));
}));

app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// listens for incoming connections to port
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);