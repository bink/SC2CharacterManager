/**
 * Static information like available backgrounds, talents, etc.
 */

var races = [
	{name:"Terran",basestats:{"str":2,"ins":2,"agi":2,"for":2,"int":2,"wil":2},cpcost:4},
];

var backgrounds = [
	{name:"Core Citizen (+WIL)",cpcost:5,basestats:{"str":0,"ins":0,"agi":1,"for":0,"int":1,"wil":1}},
	{name:"Core Citizen (+INS)",cpcost:5,basestats:{"str":0,"ins":1,"agi":1,"for":0,"int":1,"wil":0}},
	{name:"Kel-Morian Combine (+AGI)",cpcost:4,basestats:{"str":0,"ins":0,"agi":1,"for":2,"int":0,"wil":0}},
	{name:"Kel-Morian Combine (+INT)",cpcost:4,basestats:{"str":0,"ins":0,"agi":0,"for":2,"int":1,"wil":0}},
	{name:"Kel-Morian Combine (+STR)",cpcost:4,basestats:{"str":1,"ins":0,"agi":0,"for":2,"int":0,"wil":0}},
];

var skills = [
	{name:"Acrobatics",atr:"agi"},
	{name:"Athletics",atr:"str"},
	{name:"Computers",atr:"int"},
	{name:"Defensive Training",atr:""},
	{name:"Durability",atr:""},
	{name:"Endurance",atr:"for"},
	{name:"Influence",atr:"wil"},
	{name:"Leadership",atr:"wil"},
	{name:"Lore",atr:"int"},
	{name:"Medicine",atr:"int"},
	{name:"Melee",atr:""},
	{name:"Mental Training",atr:""},
	{name:"Perception",atr:"ins"},
	{name:"Pilot",atr:"ins"},
	{name:"Psionics",atr:"wil"},
	{name:"Ranged",atr:""},
	{name:"Science",atr:"int"},
	{name:"Stealth",atr:"agi"},
	{name:"Survival",atr:"ins"},
	{name:"Tactics",atr:"int"},	
];