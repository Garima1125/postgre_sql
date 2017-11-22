const args = process.argv.slice(2);
const firstName = args[0];
const lastName = args[1];
const birthDate = args[2];

const pg = require("pg");
const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

function printResult(err , rows){
  if (err) {
    return console.error("error running query", err);
  } 
  console.log('Data Inserted');
}

knex('famous_people').insert({'first_name' : firstName, 'last_name': lastName, 'birthdate': birthDate})
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  printResult(err, rows); 
});