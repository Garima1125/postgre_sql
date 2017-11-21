const args = process.argv.slice(2);
const name = args[0];

// SELECT * FROM famous_people WHERE first_name= 'Lincoln'or last_name= 'Lincoln';

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
function printResult(err , result){
if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} person(s) by the name '${name}':`)
    for(let i in result.rows){
      console.log(`- ${result.rows[i].id}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${result.rows[i].birthdate.toISOString().substring(0, 10)}'`)
    }

  }

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  console.log("Searching..");
  client.query("SELECT * FROM famous_people WHERE first_name= $1 or last_name= $1;",[name], (err, result) => {
    printResult(err, result);    
    client.end();
  });
});