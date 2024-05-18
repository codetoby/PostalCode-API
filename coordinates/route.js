const express = require('express');
const { getCoordinates } = require("./service");

const router = express.Router();

router.get("/", getCoordinates);

module.exports = router;