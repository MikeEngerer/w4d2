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

const input = process.argv[2];

function formatOutput(arr) {
    var rows = arr.rows
	console.log(`Found ${rows.length} person(s) by the name ${input}`)
	for (var i = 0; i < rows.length; i++) {
		var formattedDate = rows[i].birthdate.toString().split(" ")
	
		console.log(`- ${i + 1}: ${rows[i].first_name} ${rows[i].last_name}, born '${formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]}'`)
	}
}

var findByName = `SELECT first_name, last_name, birthdate 
				FROM famous_people
				WHERE first_name = $1::text OR last_name = $1::text
				ORDER BY last_name;`

client.connect((err) => {
	if (err) {
		return console.log("error running query", err);
		client.end()
	}
	console.log("Searching...")
	client.query((findByName), 
		[input],
		(err, result) => {
		if (err) {
      		return console.error("error running query", err);
    	}
    	formatOutput(result);
    	client.end()
	})
})