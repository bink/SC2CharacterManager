/**
 * Static information like available backgrounds, talents, etc.
 */

var races = [
	{name:"Terran",basestats:{"str":2,"ins":2,"agi":2,"for":2,"int":2,"wil":2},cpcost:4},
];

var backgrounds = [
	{name:"Core Citizen",cpcost:5,variations:[
		{name:"+1 Willpower",
			basestats:{"str":0,"ins":0,"agi":1,"for":0,"int":1,"wil":1}
		},
		{name:"+1 Instinct",
			basestats:{"str":0,"ins":1,"agi":1,"for":0,"int":1,"wil":0}
		},
	]},
	{name:"Kel-Morian Combine",cpcost:4,variations:[
		{name:"+1 Agility",
			basestats:{"str":0,"ins":0,"agi":1,"for":2,"int":0,"wil":0}
		},
		{name:"+1 Intelligence",
			basestats:{"str":0,"ins":0,"agi":0,"for":2,"int":1,"wil":0}
		},
		{name:"+1 Strength",
			basestats:{"str":1,"ins":0,"agi":0,"for":2,"int":0,"wil":0}
		}
	]},
	{name:"Fringe Colonist",cpcost:7,variations:[
		{name:"+1 Willpower",
			basestats:{"str":0,"ins":0,"agi":0,"for":0,"int":0,"wil":1}
		},
		{name:"+1 Intelligence",
			basestats:{"str":0,"ins":0,"agi":0,"for":0,"int":1,"wil":0}
		},
	]},
	{name:"Umojan Protectorate",cpcost:4,variations:[
		{name:"+2 Intelligence",
			basestats:{"str":0,"ins":0,"agi":0,"for":0,"int":2,"wil":1}
		},
		{name:"+1 Intelligence/Instinct",
			basestats:{"str":0,"ins":1,"agi":0,"for":0,"int":1,"wil":1}
		},
	]},
	{name:"UED Expedition",cpcost:6,variations:[
		{name:"+2 Strength",
			basestats:{"str":2,"ins":2,"agi":0,"for":0,"int":0,"wil":0}
		},
		{name:"+2 Intelligence",
			basestats:{"str":0,"ins":2,"agi":0,"for":0,"int":2,"wil":0}
		},
	]},
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