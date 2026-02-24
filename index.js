const express = require('express');
const os = require('os');

const app = express();

const PORT = process.env.PORT || 3000;
const BUILD_NUMBER = process.env.BUILD_NUMBER || "dev";

app.get('/', (req, res) => {
    res.json({
        message: "Node App Running 🚀",
        build: BUILD_NUMBER,
        hostname: os.hostname(),
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.status(200).send("OK");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Build number: ${BUILD_NUMBER}`);
});