const express = require("express");
const db = require("./db/db.json");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));