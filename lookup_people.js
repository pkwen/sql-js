const pg = require("pg");
const settings = require("./settings"); // settings.json

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
  name.searchByName(target,(err, result) => {
    if(err) throw err;
    console.log(result.rows);
    client.end();
  });
  // client.query("SELECT * from famous_people where first_name = $1 or last_name = $1", [name], (err, result) => {
  //   if (err) {
  //     return console.error("error running query", err);
  //   }
  //   console.log(result.rows);
  //   client.end();
  // });
});