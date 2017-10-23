function db_store_character(storage_identifier) {
	localStorage.setItem(storage_identifier, JSON.stringify(character));
}

function db_load_character(storage_identifier) {
	var characterString = localStorage.getItem(storage_identifier);
	if (characterString) {
		try {
			c_obj = JSON.parse(localStorage.getItem(storage_identifier));
			for (var i in c_obj) {
				character[i] = c_obj[i];
			}
		} catch (e) {
			console.error("Could not load character with ID "+test);
		}
	}
	console.log(characterString);
}