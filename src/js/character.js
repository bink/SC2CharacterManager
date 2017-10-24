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
	this.atr_str = atr_races_bonus.str + parseInt(this.atr_str_bonus);
	this.atr_ins = atr_races_bonus.ins + parseInt(this.atr_ins_bonus);
	this.atr_agi = atr_races_bonus.agi + parseInt(this.atr_agi_bonus);
	this.atr_for = atr_races_bonus.for + parseInt(this.atr_for_bonus);
	this.atr_int = atr_races_bonus.int + parseInt(this.atr_int_bonus);
	this.atr_wil = atr_races_bonus.wil + parseInt(this.atr_wil_bonus);

	this.stat_hp = 40 + 3 * this.atr_for;
	this.stat_def = 10 + 1 * this.atr_agi;
	this.stat_spe = 4 + Math.floor(0.5 * this.atr_agi);
	this.stat_ini = this.atr_ins;
	this.stat_tgh = 10 + this.atr_str + 0;
	this.stat_res = 10 + this.atr_wil;
	this.stat_mor = Math.floor(0.5 * this.atr_wil);
	this.stat_shi = 1;

	this.res_ht = 5 + Math.floor(0.5 * this.atr_for);
	this.res_dt = 16 + this.atr_for + 0;

	this.res_dr = Math.floor(0.5 * this.atr_for)
	this.res_pr = 3 * this.atr_wil;

	this.points_spent = parseInt(this.atr_str_bonus) + parseInt(this.atr_ins_bonus) + parseInt(this.atr_agi_bonus) + parseInt(this.atr_for_bonus) + parseInt(this.atr_int_bonus) + parseInt(this.atr_wil_bonus);
	console.log(this.points_spent);
	console.groupEnd();
};