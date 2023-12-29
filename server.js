const express = require("express");
const db = require("./db/db.json");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);