const args = process.argv.slice(2);
const name = args[0];

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
  console.log(`Found ${rows.length} person(s) by the name '${name}':`)
  for(let i in rows) {
    console.log(`- ${rows[i].id}: ${rows[i].first_name} ${rows[i].last_name}, born '${rows[i].birthdate.toISOString().substring(0, 10)}'`)
  }
}

console.log("Searching..");
knex.select().from('famous_people')
.where('first_name', '=', name)
.orWhere('last_name', '=', name)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  printResult(err, rows); 
});