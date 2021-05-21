const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/user');
const newsRoutes = require('./routes/news');
const weatherRoutes = require('./routes/weather');
const databaseConnect = require('./database');

require('dotenv').config({ path: require('find-config')('.env') })

const port = process.env.PORT;
const app = express();

databaseConnect();

app.use(express.json({ limit: '10kb', extended: true }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));
app.use(cors());
app.use(helmet());

app.use('/user', userRoutes);
app.use('/news', newsRoutes);
app.use('/weather', weatherRoutes);

app.listen(port, (err) => {
    if (err) {
        console.log('Failed to start server')
    }
    else {
        console.log(`Server running on port: ${port}`);
    }
});

process.on('unhandledRejection', error => {
    console.error(error.stack);
});

process.on('uncaughtException', error => {
    console.error(error.stack);
});

module.exports = app;




