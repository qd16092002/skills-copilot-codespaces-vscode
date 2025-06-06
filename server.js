// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Dùng thư mục 'public' để chứa file HTML
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`🚀 UI running at http://localhost:${PORT}`);
});
