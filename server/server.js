require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require("cookie-parser");
const path = require('path');
const bodyParser = require('body-parser');

app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
        })
    );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./config/config');
require('./routes/routes')(app);
require('./routes/photos.routes')(app);
const port = process.env.PORT || 8000;

// SAVES PHOTOS IN THE UPLOADS FOLDER
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//MORGAN
const morgan = require('morgan');
if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.listen(port, () => console.log(`Listening on port: ${port}...`) );