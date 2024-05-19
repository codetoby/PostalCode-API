const express = require('express');
const route = require('./coordinates/route');
const favicon = require('serve-favicon')
const path = require('path');

const PORT = 8000;

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.json());

app.use('/coordinates', route);

app.use((err, req, res, next) => {
    res.status(500).json({ error: err });
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});