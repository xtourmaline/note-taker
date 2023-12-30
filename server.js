const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require('path');
const dbPath = path.join(__dirname, "/db/db.json");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) =>
    fs.readFile(dbPath, (err, data) => {
        if (err) {
            console.log("Error reading JSON file.");
            return;
        }

        res.json(JSON.parse(data));
    })
);

app.post("/api/notes", (req, res) => {
    let note = req.body;
    note.id = uuidv4();

    fs.readFile(dbPath, (err, data) => {
        if (err) {
            console.log("Error reading JSON file.");
            return;
        }

        const db = JSON.parse(data);
        db.push(note);

        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) {
                console.log("Error in saving database", err);
            }
            else {
                console.log("Saved to database!");
                res.status(200).json(note);
            }
        });
    });
});

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;

    fs.readFile(dbPath, (err, data) => {
        if (err) {
            console.log("Error reading JSON file.");
            return;
        }

        let deletedNote = null;
        let db = JSON.parse(data);
        
        for (let i in db) {
            if (db[i].id === id) {
                deletedNote = db[i];
                db.splice(i, 1);
            }
        }

        fs.writeFile(dbPath, JSON.stringify(db), (err) => {
            if (err) {
                console.log("Error in saving database", err);
            }
            else {
                console.log("Deleted from database!");
                res.status(200).json(deletedNote);
            }
        });
    })
});

app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// listens for incoming connections to port
app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);