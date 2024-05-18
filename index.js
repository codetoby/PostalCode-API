const express = require('express');
const route = require('./coordinates/route');
const { fiveSecondLimiter, minuteLimiter, hourLimiter, dayLimiter } = require('./ratelimit');

const PORT = 8000;

const app = express();

app.use(express.json());

app.use(fiveSecondLimiter);
app.use(minuteLimiter);
app.use(hourLimiter);
app.use(dayLimiter);

app.use('/coordinates', route);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});