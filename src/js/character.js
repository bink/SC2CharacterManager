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
	atr_backg_bonus = backgrounds[this.background]["variations"][this.background_variation.substr(2)].basestats;
	this.atr_str = atr_races_bonus.str + atr_backg_bonus.str + parseInt(this.atr_str_bonus);
	this.atr_ins = atr_races_bonus.ins + atr_backg_bonus.ins + parseInt(this.atr_ins_bonus);
	this.atr_agi = atr_races_bonus.agi + atr_backg_bonus.agi + parseInt(this.atr_agi_bonus);
	this.atr_for = atr_races_bonus.for + atr_backg_bonus.for + parseInt(this.atr_for_bonus);
	this.atr_int = atr_races_bonus.int + atr_backg_bonus.int + parseInt(this.atr_int_bonus);
	this.atr_wil = atr_races_bonus.wil + atr_backg_bonus.wil + parseInt(this.atr_wil_bonus);

	for(var i in this.specs_taken) {
		var spec = specializations[i];
		this.atr_str += parseInt(spec.basestats.str);
		this.atr_ins += parseInt(spec.basestats.ins);
		this.atr_agi += parseInt(spec.basestats.agi);
		this.atr_for += parseInt(spec.basestats.for);
		this.atr_int += parseInt(spec.basestats.int);
		this.atr_wil += parseInt(spec.basestats.wil);
	}

	this.points_spent = parseInt(this.atr_str_bonus)*3 + parseInt(this.atr_ins_bonus)*3 + parseInt(this.atr_agi_bonus)*3 + parseInt(this.atr_for_bonus)*3 + parseInt(this.atr_int_bonus)*3 + parseInt(this.atr_wil_bonus)*3 + races[this.race].cpcost + backgrounds[this.background].cpcost;

	this.points_total = 25;

	for(var i in skills) {
		this["ski_"+skills[i]["name"].toLowerCase().replace(/\s/g,'')+"_ranks"] = this["ski_"+skills[i]["name"].toLowerCase().replace(/\s/g,'')+"_ranks_bonus"];
		if (skills[i]["atr"] !== "") {
			this["ski_"+skills[i]["name"].toLowerCase().replace(/\s/g,'')+"_total"] = parseInt(this["ski_"+skills[i]["name"].toLowerCase().replace(/\s/g,'')+"_ranks_bonus"]) + this["atr_"+skills[i]["atr"]];
		} else {
			this["ski_"+skills[i]["name"].toLowerCase().replace(/\s/g,'')+"_total"] = parseInt(this["ski_"+skills[i]["name"].toLowerCase().replace(/\s/g,'')+"_ranks_bonus"]);
		}
	}

	this.stat_hp = 40 + 3 * this.atr_for + (5+this.atr_for) * this.ski_durability_ranks;
	this.stat_def = 10 + parseInt(this.ski_defensivetraining_ranks) + this.atr_agi;
	this.stat_spe = 4 + Math.floor(0.5 * this.atr_agi);
	this.stat_ini = this.atr_ins;
	this.stat_tgh = 10 + parseInt(this.ski_defensivetraining_ranks) + this.atr_str + 0;
	this.stat_res = 10 + parseInt(this.ski_mentaltraining_ranks) + this.atr_wil;
	this.stat_mor = Math.floor(0.5 * this.ski_mentaltraining_ranks) + Math.floor(0.5 * this.atr_wil);
	this.stat_shi = 1;

	this.res_ht = 5 + Math.floor(0.5 * this.atr_for);
	this.res_dt = 16 + parseInt(this.ski_durability_ranks) + this.atr_for + 0;

	this.res_dr = Math.floor(0.5 * this.atr_for)
	this.res_pr = 3 * this.atr_wil + Math.floor(0.5 * this.ski_mentaltraining_ranks);

	console.log(this.points_spent);
	console.groupEnd();
};

character.addSpec = function(specid) {
	if(!this.specs_taken) {
		this.specs_taken = [];
	}

	if(!(specid in this.specs_taken)) {
		this.specs_taken.push(specid);
	}
}

character.removeSpec = function(specid) {
	if(specid in this.specs_taken) {
		var index = this.specs_taken.indexOf(specid);
		this.specs_taken.splice(index, 1);
	}
}

character.addTalent = function(talentid) {
	if(!this.talents_taken) {
		this.talents_taken = [];
	}

	if(!(talentid in this.talents_taken)) {
		this.talents_taken.push(talentid);
	}
}

character.removeTalent = function(talentid) {
	if(talentid in this.talents_taken) {
		var index = this.talents_taken.indexOf(talentid);
		this.talents_taken.splice(index, 1);
	}
}