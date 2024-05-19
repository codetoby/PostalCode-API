const express = require('express');
const { getCoordinates } = require("./service");
const { fiveSecondLimiter, minuteLimiter, hourLimiter, dayLimiter } = require("../ratelimit");

const router = express.Router();

router.get("/", getCoordinates);

router.use(fiveSecondLimiter);
router.use(minuteLimiter);
router.use(hourLimiter);
router.use(dayLimiter);


module.exports = router;