/** Init **/

function fillStaticValues() {
	for(var i in races) {
		$("<option>").attr("value",i).html(races[i]["name"])
			.appendTo("#c_race");
	}
}

function setupBonusFields() {
	$(".c_save.incrementable").each(function(){
		$("<input>").attr("type","hidden")
			.attr("id",$(this).attr("id")+"_base")
			.attr("value",0)
			.insertAfter(this);
		$("<input>").attr("type","hidden")
			.attr("id",$(this).attr("id")+"_bonus")
			.attr("value",0)
			.insertAfter(this);
	});

	$(".incrementable").each(function() {

		$(this).removeClass("c_save").addClass("c_calc");

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
	updateCharacter();
}

function init() {
	fillStaticValues();
	setupBonusFields();
	// Load the initial character
	db_load_character("test");
}

$(init());

/** Updating the character **/

function toCharacter() {
	// Write all values marked as "c_save" to the character object
	$(".c_save").each(function() {
		var field_id = $(this).attr("id").substring(2);
		if ($(this).hasClass("incrementable")) {
			var fieldVal = parseInt($("#c_"+field_id+"_bonus").attr("value"));
			character[field_id+"_bonus"] = fieldVal;
		} else {
			character[field_id] = $(this).val();
		}
	});
}

function fromCharacter() {
	// Get all values from character and find a field to write them in
	for(var i in character) {
		$(".c_save#c_"+i+"_bonus").val(character[i+"_bonus"]);
		$(".c_calc#c_"+i).val(character[i]);
	}
}

function updateCharacter() {
	toCharacter();
	character.calc();
	fromCharacter();
	db_store_character("test");
}

$(".c_save").on("keyup change",null,null,updateCharacter);

character.calc();
fromCharacter();