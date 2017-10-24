/** Init **/

function fillStaticValues() {
	for(var i in races) {
		$("<option>").attr("value",i).html(races[i]["name"])
			.appendTo("#c_race");
	}
}

function setupFields() {
	// Add +/- Buttons to .incrementable fields
	$(".incrementable").each(function(){

		$(this).addClass("c_calc");

		$("<input>").attr("type","hidden")
			.attr("id",$(this).attr("id")+"_bonus")
			.attr("value",0)
			.addClass("c_save")
			.insertAfter(this);

		var incbtn = $("<button data-target=\"#"+this.id+"\"><span class=\"glyphicon glyphicon-plus\"></span></button>").addClass("btn btn-default btn-inc");
		
		incbtn.click(function() {
			addBonus($(this).attr("data-target"),1);
		});

		var decbtn = $("<button data-target=\"#"+this.id+"\"><span class=\"glyphicon glyphicon-minus\"></span></button>").addClass("btn btn-default btn-inc");

		decbtn.click(function() {
			addBonus($(this).attr("data-target"),-1);
		});

		var btncont = $("<div class=\"btn-container\">").insertAfter(this);
		incbtn.appendTo(btncont);
		decbtn.appendTo(btncont);
	});
}

function addBonus(field,amount) {
	var targetField = field + "_bonus";
	var currentvalue = parseInt($(targetField).attr("value"));

	var newvalue = currentvalue + amount;

	$(targetField).val(newvalue);
	calc();
}

function init() {
	fillStaticValues();
	setupFields();
	// Load the initial character
	//db_load_character("test");
}

$(init());

/** Calculations **/

/**
 * This function is always called when updating any field in the table.
 */
function calc() {
	toCharacter(); //Write all savable values to the character object
	character.calc();
	fromCharacter();
}

/** Menus **/
$(".menu-save").click(function() {
	db_store_character("test");
});

$(".menu-load").click(function() {
	db_load_character("test");
	character.calc();
	fromCharacter();
});

/** Updating the character **/

function toCharacter() {
	// Write all values marked as "c_save" to the character object
	$(".c_save").each(function() {
		var field_id = $(this).attr("id").substring(2);
		character[field_id] = $(this).val();
	});

	console.log(character);
}

function fromCharacter() {
	// Get all values from character and find a field to write them in
	for(var i in character) {
		$(".c_save#c_"+i+"_bonus").val(character[i+"_bonus"]);
		$(".c_calc#c_"+i).val(character[i]);
		$(".c_save#c_"+i).val(character[i]);
	}
}
/*
function updateCharacter() {
	toCharacter();
	character.calc();
	fromCharacter();
	db_store_character("test");
}
*/

$(".c_save").on("keyup change",null,null,calc);

calc();

//character.calc();
//fromCharacter();