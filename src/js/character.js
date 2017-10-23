/**
 * Handeling the currently loaded character, storing information
 * and calculating values.
 */

var character = {}; // Global, currently loaded character

character.calc = function() {

	console.group("Character calculation");

	for (var i in this) {
		if (this[i+"_bonus"]) {
			if (i.substr(-6) != "_bonus" && i.substr(-5) != "_base") {
				this[i] = parseInt(this[i+"_base"]) + parseInt(this[i+"_bonus"]);
			}
		}
	}

	atr_races_bonus = races[this.race].basestats;
	this.atr_str = atr_races_bonus.str + this.atr_str_bonus;
	this.atr_ins = atr_races_bonus.ins + this.atr_ins_bonus;
	this.atr_agi = atr_races_bonus.agi + this.atr_agi_bonus;
	this.atr_for = atr_races_bonus.for + this.atr_for_bonus;
	this.atr_int = atr_races_bonus.int + this.atr_int_bonus;
	this.atr_wil = atr_races_bonus.wil + this.atr_wil_bonus;

	this.stat_hp = 40 + 3 * this.atr_for;
	this.stat_def = 10 + 1 * this.atr_agi;

	console.groupEnd();
};