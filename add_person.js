const settings = require("./settings"); // settings.json
const knex = require("knex")({
	client: "pg",
	connection: settings
});

const firstName = process.argv[2]
const lastName = process.argv[3]
const dob = process.argv[4]

knex('famous_people').insert({'first_name': firstName, 'last_name': lastName, 'birthdate': dob}).then(function() {
	knex.destroy();
})

