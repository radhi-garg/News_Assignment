const mongoose = require('mongoose');
const { TEST } = require('./constants/constants');
require('dotenv').config();

module.exports = () => {
  const mongodb_user = process.env.MONGODB_USER;
  const mongodb_password = process.env.MONGODB_PASSWORD;
  const mongodb_db = process.env.NODE_ENV === TEST ? process.env.MONGODB_DATABASE_TEST : process.env.MONGODB_DATABASE;
  const mongodb_host = process.env.MONGODB_SERVICE_HOST;
  const mongodb_port = process.env.MONGODB_SERVICE_PORT;
  const db_service = process.env.MONGODB_SERVICE_NAME;
  const auth_db = process.env.MONGODB_AUTH_DB;

  let identifiers = '', auth = '';

  if (mongodb_password && mongodb_user) {
    identifiers = `${mongodb_user}:${mongodb_password}@`;
  }

  if (auth_db) {
    auth = `?authSource=${auth_db}`;
  }

  const mongoDb = `${db_service}://${identifiers}${mongodb_host}:${mongodb_port}/${mongodb_db}${auth}`;

  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  };

  mongoose.connect(mongoDb, options);
};