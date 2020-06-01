require('dotenv').config()
const { Client } = require('pg');
// const credentials = require('./credentials.js');

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

client.connect((err) => {
  if(err) console.log('could not connect to postgres: ', err)
  else console.log(':) connected to postgres')
});

const getInfo = (id, callback) => {
  const query = {
    text: `SELECT * FROM open_table WHERE listingId = ($1)`,
    values: [id]
  }
  client.query(query, (err, results) => {
    if(err) {
      callback(err);
    } else {
      callback(null, results);
    }
  })
}

module.exports = {
  client,
  getInfo
}
