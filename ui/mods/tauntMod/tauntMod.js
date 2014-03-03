// (C) Jord Nijhuis 2014
// TauntMod for Planetary Annihilation
// Adds Age Of Empires 2 taunts to PA

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

initialSettingValue("tauntVolume", 10);
initialSettingValue("tauntsMax", 5);

function TauntPack(name){

	this.name 	= name;
	this.taunts = [];

	tauntPacks[this.name] = this;

	console.log(this.name);
	console.log(tauntPacks[this.name]);

	this.getName = function(){

		return this.name;
	}

	this.setName = function(name){

		this.name = name;
	}

	this.getTaunts = function(){

		return this.taunts;
	}

	this.setTaunts = function(taunts){

		this.taunts = taunts;
	}
}

function Taunt(match, name, path, replace){

	this.match 		= match;
	this.name 		= name;
	this.path 		= path;
	this.replace	= replace;
	this.buffer 	= undefined;

	this.getMatch = function(){

		return this.match;
	}

	this.setMatch = function(match){

		this.match = match;
	}

	this.getName = function(){

		return this.name;
	}

	this.setName = function(name){

		this.name = name;
	}

	this.getPath = function(){

		return this.path;
	}

	this.setPath = function(path){

		this.path = path;
	}

	this.getReplace = function(){

		return this.replace;
	}

	this.setReplace = function(replace){

		this.replace = replace;
	}

	this.load = function(callback){

		var self = this,
			request = new XMLHttpRequest();

		if(this.isLoaded()){

			callback(this.buffer);
			return;
		}

		request.open("GET", this.path, true);
		request.responseType = "arraybuffer";

		request.onload = function(){

			context.decodeAudioData(request.response, function(buffer){

				self.buffer = buffer;
				callback(buffer);

			}, function(error){ 
				console.error("Error while loading sound: " + this.path);
				callback();
			});

		}

		request.send();
	}

	this.isLoaded = function(){

		return this.buffer != undefined;
	}

	this.play = function(){

		var settings = decode(localStorage.settings);

		this.load(function(buffer){

			//Maximum of five taunts at the same time to prevent spamming
			if(context.activeSourceCount >= parseInt(settings.tauntsMax)) return;
			
			//Create Gain
			var volume = context.createGainNode();
			volume.gain.value = settings.tauntVolume / 10 * settings.master_volume / 100;

			console.log(this.buffer);

			//Create audio source
			var source = context.createBufferSource();
			source.buffer = buffer;


			//Connect source to volume
			source.connect(volume);
			//Connect volume
			volume.connect(context.destination);

			//Play
			source.start(0);

			//Added a cleaning method, which may or may not work
			setTimeout(function(){

				source = undefined;
				volume = undefined;

				return;

			}, source.buffer.duration * 1000 + 1000)

		});
	}
}

var tauntPacks = {};
//AoE II Taunts
new TauntPack("AoE II");

tauntPacks["AoE II"].setTaunts([

	new Taunt(/^1$/, "Yes", "coui://ui/mods/tauntMod/AoE II/01 Yes.wav", true),
	new Taunt(/^2$/,  "No", "coui://ui/mods/tauntMod/AoE II/02 No.wav", true),
	new Taunt(/^3$/,  "Food, please", "coui://ui/mods/tauntMod/AoE II/03 Food, please.wav", true),
	new Taunt(/^4$/,  "Wood, please", "coui://ui/mods/tauntMod/AoE II/04 Wood, Please.wav", true),
	new Taunt(/^5$/,  "Gold, please", "coui://ui/mods/tauntMod/AoE II/05 Gold, Please.wav", true),
	new Taunt(/^6$/,  "Stone, please", "coui://ui/mods/tauntMod/AoE II/06 Stone, Please.wav", true),
	new Taunt(/^7$/,  "Ahh", "coui://ui/mods/tauntMod/AoE II/07 Ahh.wav", true),
	new Taunt(/^8$/,  "All hail, king of the losers", "coui://ui/mods/tauntMod/AoE II/08 All hail.wav", true),
	new Taunt(/^9$/,  "Oooh", "coui://ui/mods/tauntMod/AoE II/09 Oooh.wav", true),
	new Taunt(/^10$/, "I'll beat you back to Age of Empires", "coui://ui/mods/tauntMod/AoE II/10 Back to Age 1.wav", true),
	new Taunt(/^11$/, "Herb laugh", "coui://ui/mods/tauntMod/AoE II/11 Herb laugh.wav", true),
	new Taunt(/^12$/, "Aah! Being rushed", "coui://ui/mods/tauntMod/AoE II/12 Being rushed.wav", true),
	new Taunt(/^13$/, "Sir, blame it on your ISP", "coui://ui/mods/tauntMod/AoE II/13 Blame your isp.wav", true),
	new Taunt(/^14$/, "Start the game already", "coui://ui/mods/tauntMod/AoE II/14 Start the game.wav", true),
	new Taunt(/^15$/, "Don't point that thing at me", "coui://ui/mods/tauntMod/AoE II/15 Don't Point That Thing.wav", true),
	new Taunt(/^16$/, "Enemy sighted", "coui://ui/mods/tauntMod/AoE II/16 Enemy Sighted.wav", true),
	new Taunt(/^17$/, "It is good to be the king", "coui://ui/mods/tauntMod/AoE II/17 It Is Good.wav", true),
	new Taunt(/^18$/, "Monk! I need a monk", "coui://ui/mods/tauntMod/AoE II/18 I Need a Monk.wav", true),
	new Taunt(/^19$/, "Long time no siege", "coui://ui/mods/tauntMod/AoE II/19 Long Time No Siege.wav", true),
	new Taunt(/^20$/, "My granny could scrap better than that", "coui://ui/mods/tauntMod/AoE II/20 My granny.wav", true),
	new Taunt(/^21$/, "Nice town, I'll take it", "coui://ui/mods/tauntMod/AoE II/21 Nice Town I'll Take It.wav", true),
	new Taunt(/^22$/, "Quit touchin me", "coui://ui/mods/tauntMod/AoE II/22 Quit Touchin.wav", true),
	new Taunt(/^23$/, "Raiding Party", "coui://ui/mods/tauntMod/AoE II/23 Raiding Party.wav", true),
	new Taunt(/^24$/, "Dadgum", "coui://ui/mods/tauntMod/AoE II/24 Dadgum.wav", true),
	new Taunt(/^25$/, "Smite Me", "coui://ui/mods/tauntMod/AoE II/25 Smite Me.wav", true),
	new Taunt(/^26$/, "The wonder! The Wonder! Noo", "coui://ui/mods/tauntMod/AoE II/26 The wonder.wav", true),
	new Taunt(/^27$/, "You play 2 hours to die like this?", "coui://ui/mods/tauntMod/AoE II/27 You play 2 hours.wav", true),
	new Taunt(/^28$/, "You should see the other guy", "coui://ui/mods/tauntMod/AoE II/28 You Should See The Other Guy.wav", true),
	new Taunt(/^29$/, "Roggan", "coui://ui/mods/tauntMod/AoE II/29 Roggan.wav", true),
	new Taunt(/^30$/, "Wololo", "coui://ui/mods/tauntMod/AoE II/30 Wololo.wav", true),
	new Taunt(/^31$/, "Attack an enemy now", "coui://ui/mods/tauntMod/AoE II/31 Attack an Enemy Now.wav", true),
	new Taunt(/^32$/, "Cease creating extra villagers", "coui://ui/mods/tauntMod/AoE II/32 Cease Creating Extra Villagers.wav", true),
	new Taunt(/^33$/, "Create extra villagers", "coui://ui/mods/tauntMod/AoE II/33 Create Extra Villagers.wav", true),
	new Taunt(/^34$/, "Build a navy", "coui://ui/mods/tauntMod/AoE II/34 Build a Navy.wav", true),
	new Taunt(/^35$/, "Stop building a navy", "coui://ui/mods/tauntMod/AoE II/35 Stop building a Navy.wav", true),
	new Taunt(/^36$/, "Wait for my signal to attack", "coui://ui/mods/tauntMod/AoE II/36 Wait for My Signal to Attack.wav", true),
	new Taunt(/^37$/, "Build a wonder", "coui://ui/mods/tauntMod/AoE II/37 Build a Wonder.wav", true),
	new Taunt(/^38$/, "Give me your extra resources", "coui://ui/mods/tauntMod/AoE II/38 Give Me Your Extra Resources.wav", true),
	new Taunt(/^39$/, "Ally", "coui://ui/mods/tauntMod/AoE II/39 Ally.wav", true),
	new Taunt(/^40$/, "Enemy", "coui://ui/mods/tauntMod/AoE II/40 Enemy.wav", true),
	new Taunt(/^41$/, "Neutral", "coui://ui/mods/tauntMod/AoE II/41 Neutral.wav", true),
	new Taunt(/^42$/, "What age are you in?", "coui://ui/mods/tauntMod/AoE II/42 What Age Are You In.wav", true),
]);