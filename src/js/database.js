function getDb() {
	var db = localStorage.getItem("characters");
	if (db) {
		return JSON.parse(db);
	} else {
		return {};
	}
}

function saveDb(db) {
	localStorage.setItem("characters",JSON.stringify(db));
}

function db_store_character(storage_identifier) {
	var db = getDb();
	db[storage_identifier] = character;
	saveDb(db);
}

function db_load_character(storage_identifier) {
	var db = getDb();
	var char = db[storage_identifier];

	for (var i in char) {
		console.log("Setting character["+i+"] to "+char[i]);
		character[i] = char[i];
	}
	console.log(character);
}