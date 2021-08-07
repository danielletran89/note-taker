const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
let allNotes = require('./db/db.json');
console.log(allNotes);

const PORT = process.env.PORT || 3009;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    res.json(allNotes)
})

app.post("/api/notes", (req, res) => {
    const newNote = req.body 
    newNote.id= allNotes.length
    allNotes.push(newNote) 
    fs.writeFileSync("./db/db.json", JSON.stringify(allNotes)) 
    res.status(201).end()
    return res.json(allNotes)
});

app.delete("/api/notes/:id", function (req, res) {
    const id = req.params.id
    console.log(id)
    const filteredNotes = allNotes.filter((note) => note.id !== parseInt(id)) 
    console.log(filteredNotes)
    fs.writeFileSync("./db/db.json", JSON.stringify(filteredNotes)) 
    allNotes = filteredNotes
    return res.json({ok: true})
})

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});