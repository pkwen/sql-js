const pg = require("pg");
const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const name = require('./by_name')(client);

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  let target = process.argv[2];
  knex.select('*')
    .from('famous_people')
    .where('first_name', target)
    .orWhere('last_name', target)
    .asCallback(function(err, rows) {
      if(err) throw err;
      console.log(rows);
      // knex.destroy();
    process.exit();
    });
  // name.searchByName(target,(err, result) => {
  //   if(err) throw err;
  //   console.log(result.rows);
  //   client.end();
  // });
});