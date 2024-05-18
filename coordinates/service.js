const fs = require("fs");
const csvParser = require("csv-parser");

const getCoordinates = async (req, res, next) => {

    const { zipcode } = req.query;

    if (!zipcode) {
        return res.status(400).json({ error: "Zipcode is required" });
    }

    const coordinates = await fetchCoordiantes(zipcode);

    if (!coordinates) {
        return res.status(404).json({ error: "Coordinates not found" });
    }

    return res.status(200).json(coordinates);

}

const fetchCoordiantes = async (zipcode) => {

    const data = await readFile();
    const coordinates = data.find((row) => row.zipcode_code === zipcode);
    return coordinates;

}

const readFile = async () => {
    const results = [];
    
    return new Promise((resolve, reject) => {
        fs.createReadStream("./zipcodes.csv")
            .pipe(csvParser())
            .on("data", (data) => results.push(data))
            .on("end", () => resolve(results));
    });

}

module.exports = {
    getCoordinates
}

