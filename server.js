const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.sendFile(path.join(_dirname, 'public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(_dirname, 'public/notes.html'));
})

app.get('api.notes', (req, res) => {
    const data = JSON.parse(fs.readFileSync(path.join(_dirname, 'db/db.json')));
    res.send(data);
})

app.post('api.notes', (req, res) => {
    const data = fs.readFileSync('.db/db.json');
    fs.writeFileSync('./db/db.json', JSON.stringify(data.concat(req.body)), 'utf-8');
    res.send(req.body);
})

app.listen(PORT, () => {
    console.log(`listening at http://localhost${PORT}`);
})

