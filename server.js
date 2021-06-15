const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000;
const db = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
    res.send(data);
})

app.post('/api/notes', (req, res) => {
    const body = {...req.body};
    body.id = uuidv4();
    const data =JSON.parse( fs.readFileSync('./db/db.json', 'utf-8'));
    fs.writeFileSync('./db/db.json', JSON.stringify(data.concat(body)), 'utf-8');
    res.send(body);
})

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    const objects = JSON.parse(fs.readFileSync("./db/db.json", 'utf-8'));
    const items = objects.filter(item => item.id !== id);
    fs.writeFileSync("./db/db.json", JSON.stringify(items), 'utf-8');
    res.send(items);
})

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
})

