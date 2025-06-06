const fs = require('fs');
const https = require('https');
const app = require('express')();

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
    ca: fs.readFileSync('.rnd')
};

https.createServer(options, app).listen(3000, () => {
    console.log('Server running on https://localhost:3000');
});
