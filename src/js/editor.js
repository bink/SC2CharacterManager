/** Init **/

// Fills all fields that contain static information like races, talents, etc.
function fillStaticValues() {
	for(var i in races) {
		// Create an option element and append it to the race select menu
		var option = $("<option>").attr("value",i)
			.html(races[i]["name"]);

		option.appendTo("#c_race");
	}
	for(var i in backgrounds) {
		// Create an option element and append it to the backgrounds select menu
		var background = backgrounds[i];
		var option = $("<option>").attr("value",i)
			.html(background["name"]);

		option.appendTo("#c_background");

		for(var j in background["variations"]) {
			// Create an option element and append it to the variations
			// These elements are filtered by the filterBackgrounds function
			// To ensure unique values, the value includes the backgrounds id
			// as well as the variations id like this: 1-2
			var variation = background["variations"][j];
			var option = $("<option>").attr("value",i+"-"+j)
				.html(variation["name"])
				.attr("data-background",i);

			option.appendTo("#c_background_variation");
		}
	}

	// Filter the variation field based on the selected background to only
	// display variations that actually apply to that background
	var filterBackgrounds = function() {
		var bg = $("#c_background").val();
		// Reset and display all variations first...
		var options = $("#c_background_variation > option")
			.show()
			.removeAttr("disabled")
			.prop("selected",false);

		// ...then grab those who do NOT belong to the selected background
		// and hide them.
		options.not("[data-background=\""+bg+"\"]")
			.hide()
			.attr("disabled","disabled");

		// Get the enabled options and select the first one, thus updating
		// the select field
		var en = $("#c_background_variation > option").not("[disabled]");
		en.first().prop("selected",true);
	}

	filterBackgrounds(); // Call filterBackgrounds once initially for setup

	// Call filterBackgrounds whenever the background field is changed
	$("#c_background").change(filterBackgrounds);

	// Now we set up the skill table. This could be done in HTML but I'm way
	// too lazy to type all that out, so we generate the table dynamically.
	for(var i in skills) {
		var skill = skills[i];

		var row = $("<tr>");

		// First column is just the skill name
		$("<td>").html(skill["name"]).appendTo(row);
		
		// Second column is an input field with +/- buttons for the ranks in
		// that skill.
		var ranksTd = $("<td>").appendTo(row);

		$("<input>").attr("type","text")
			.attr("id","c_ski_"+getSkillFieldId(skill["name"])+"_ranks")
			.addClass("form-control incrementable")
			.attr("value",0)
			.appendTo(ranksTd);

		// The last column is an input field that is automatically filled with
		// the total bonus (ranks + attribute bonus) on character calculation.
		var bonusTd = $("<td>").appendTo(row);

		$("<input>").attr("type","text")
			.attr("id","c_ski_"+getSkillFieldId(skill["name"])+"_total")
			.addClass("form-control c_calc")
			.attr("value",0)
			.appendTo(bonusTd);

		row.appendTo($("#skills_table"));
	}

	// Now we add the specializations to the add specialization menu
	for(var i in specializations) {
		var spec = specializations[i];

		var option = $("<option>").attr("id",i)
			.html(spec["name"])
			.attr("value",i);

		option.appendTo($("#spec_add_select"));
	}
}

// Utility function to make the skill name a valid ID.
function getSkillFieldId(skillname) {
	return skillname.toLowerCase().replace(/\s/g,'');
}

// Grabs all the characters from the database and fills the character select
// field in the modal that pops up when hitting the load button.
function loadCharacters() {
	var db = getDb();
	for (var i in db) {
		$("<option>").attr("value",i)
			.html(db[i]["name"])
			.appendTo($("#load_character_select"));
	}
}

// Here we set up custom functions for fields like incrementable (+/-) and
// automatically calculated fields.
function setupFields() {
	// Add +/- Buttons to .incrementable fields
	$(".incrementable").each(function(){

		$(this).addClass("c_calc");

		// We add a hidden bonus field here that keeps tracks of how much we
		// increased/decreased the value. This is so that the visible input
		// field can simply contain the final value, including bonuses.
		$("<input>").attr("type","hidden")
			// The field ID is suffex with "_bonus"
			.attr("id",$(this).attr("id")+"_bonus")
			.attr("value",0)
			// Make sure that this field is saved in the character object
			.addClass("c_save")
			.insertAfter(this);

		// I didn't bother programmatically adding classes and attributes here
		// and just pasted the HTML I had in my mockup. It works.
		var incbtn = $("<button data-target=\"#"+this.id+"\"><span class=\"glyphicon glyphicon-plus\"></span></button>").addClass("btn btn-default btn-inc");
		
		incbtn.click(function() {
			addBonus($(this).attr("data-target"),1);
		});

		// The decrease button works exactly like the increase button...
		var decbtn = $("<button data-target=\"#"+this.id+"\"><span class=\"glyphicon glyphicon-minus\"></span></button>").addClass("btn btn-default btn-inc");

		decbtn.click(function() {
			//...we just "add" -1 here instead of 1.
			addBonus($(this).attr("data-target"),-1);
		});

		// This is a nice button container that places the buttons to the right
		// of the input field using CSS.
		var btncont = $("<div class=\"btn-container\">").insertAfter(this);
		incbtn.appendTo(btncont);
		decbtn.appendTo(btncont);
	});

	// Add a click handler to the add specialization button
	$("#spec_add_button").click(function() {
		// Get the selected specialization
		var spec = $("#spec_add_select").val();
		// Add it to the character
		character.addSpec(spec);

		calc();
	});
}

// Called by the increment buttons to add/subtract from the field value
function addBonus(field,amount) {
	var targetField = field + "_bonus"; // Suffix for the field ID
	var currentvalue = parseInt($(targetField).attr("value"));

	var newvalue = currentvalue + amount;

	$(targetField).val(newvalue);
	// Recalculate the characters stats after incrementing/decrementing a field
	calc();
}

// Called once when the document loads
function init() {
	fillStaticValues();
	setupFields();
	loadCharacters();
	// Make sure that c_save fields automatically call the calc function when
	// they are changed or a key is released while they are active. (So that
	// they update in real time.)
	$(".c_save").on("keyup change",null,null,calc);
	// Make the first initial caluclation
	calc();
}

// Call the init function
$(init());

/** Calculations **/

// This is called whenever a field changes in the character sheet
function calc() {
	toCharacter(); // Write all savable values to the character object
	character.calc(); // Calculate stats and bonuses and such
	fromCharacter(); // Update all the fields with the new values
}

/** Menus **/
$(".menu-save").click(function() {
	if (character["name"] == "") {
		alert("You have to enter a character name before saving.")
	} else {
		db_store_character(character["name"]);
	}
});

// This button is not part of the top menu but is located in the modal that
// pops up when the top menu load button is pressed.
$("#load_character_button").click(function() {
	db_load_character($("#load_character_select").val());
	character.calc();
	fromCharacter();
	$("#load_character_modal").modal("hide");
});


/** Updating the character **/

function toCharacter() {
	// Write all values marked as "c_save" to the character object
	$(".c_save").each(function() {
		var field_id = $(this).attr("id").substring(2);
		character[field_id] = $(this).val();
	});

}

function fromCharacter() {
	// Get all values from character and find the correct field to write them
	// in.
	for(var i in character) {
		$(".c_save#c_"+i+"_bonus").val(character[i+"_bonus"]);
		$(".c_calc#c_"+i).val(character[i]);
		$(".c_save#c_"+i).val(character[i]);
	}

	// Fill the cp spent/cp total fields as well.
	$("#cp_spent").html(character.points_spent);
	$("#cp_total").html(character.points_total);
	
	// Clear the table completely
	$("tr.specialization").remove();

	// Add specs to spec table
	for(var i in character.specs_taken) {
		var spec = specializations[character.specs_taken[i]];
		var specrow = $("<tr>").addClass("specialization");
		// Add a name column
		$("<td>").html(spec["name"])
			.appendTo(specrow);
		// ...and a description column.
		$("<td>").html(spec["description"])
			.appendTo(specrow);

		// The last column contains actions that can be performed with the
		// specialization. Currently it only has a remove button.
		var actionTd = $("<td>").appendTo(specrow);
		// The remove button calls character.removeSpec and then calc
		$("<button>").html("Remove")
			.addClass("btn btn-default pull-right")
			.click(function() {
				character.removeSpec(character.specs_taken[i]);
				calc();
			})
			.appendTo(actionTd);

		specrow.appendTo($("#spec_table"));
	}
}