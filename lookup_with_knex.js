const settings = require("./settings"); // settings.json
const knex = require("knex")({
	client: "pg",
	connection: settings
});

const input = process.argv[2];

function formatOutput(arr) {
    var rows = arr
	console.log(`Found ${rows.length} person(s) by the name ${input}`)
	for (var i = 0; i < rows.length; i++) {
		var formattedDate = rows[i].birthdate.toString().split(" ");
		console.log(`- ${i + 1}: ${rows[i].first_name} ${rows[i].last_name}, born '${formattedDate[1] + " " + formattedDate[2] + " " + formattedDate[3]}'`)
	}
};



knex.select().from("famous_people").where("first_name", input).asCallback((err, rows) => {
	if (err) {
		console.log("error running query: ", err)
		knex.destroy()
	}
	formatOutput(rows);
	knex.destroy();
})
