// backend/app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors'); // Importieren von cors
const postRoutes = require('./routes/postRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Verwenden von cors

app.use('/api', postRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
