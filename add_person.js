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
  let fname = process.argv[2];
  let lname = process.argv[3];
  let bdate = process.argv[4];
  // knex.insert({
  //   first_name: fname,
  //   last_name: lname,
  //   birthdate: bdate
  // }).into('famous_people')
  // .then(function() {
  //   // console.log();
  // }).finally(function() {
  //   knex.destroy();
  // });
  knex('famous_people').insert({
    first_name: fname,
    last_name: lname,
    birthdate: bdate
    }, ['*'])
    .then(function(results) {
      console.log(results);
    })
    .finally(function() {
      process.exit();
    });
  // name.searchByName(target,(err, result) => {
  //   if(err) throw err;
  //   console.log(result.rows);
  //   client.end();
  // });
