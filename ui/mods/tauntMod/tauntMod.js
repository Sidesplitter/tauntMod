// (C) Jord Nijhuis 2014
// TauntMod for Planetary Annihilation
// Adds Age Of Empires 2 taunts to PA

window.AudioContext = window.AudioContext || window.webkitAudioContext;
context = new AudioContext();

initialSettingValue("tauntVolume", 10);
initialSettingValue("tauntsMax", 5);

var taunts = {

	"1"  : new Taunt("1", "Yes", "coui://ui/mods/tauntMod/taunts/01 Yes.wav"),
	"2"  : new Taunt("2",  "No", "coui://ui/mods/tauntMod/taunts/02 No.wav"),
	"3"  : new Taunt("3",  "Food, please", "coui://ui/mods/tauntMod/taunts/03 Food, please.wav"),
	"4"  : new Taunt("4",  "Wood, please", "coui://ui/mods/tauntMod/taunts/04 Wood, Please.wav"),
	"5"  : new Taunt("5",  "Gold, please", "coui://ui/mods/tauntMod/taunts/05 Gold, Please.wav"),
	"6"  : new Taunt("6",  "Stone, please", "coui://ui/mods/tauntMod/taunts/06 Stone, Please.wav"),
	"7"  : new Taunt("7",  "Ahh", "coui://ui/mods/tauntMod/taunts/07 Ahh.wav"),
	"8"  : new Taunt("8",  "All hail, king of the losers", "coui://ui/mods/tauntMod/taunts/08 All hail.wav"),
	"9"  : new Taunt("9",  "Oooh", "coui://ui/mods/tauntMod/taunts/09 Oooh.wav"),
	"10" : new Taunt("10", "I'll beat you back to Age of Empires", "coui://ui/mods/tauntMod/taunts/10 Back to Age 1.wav"),
	"11" : new Taunt("11", "Herb laugh", "coui://ui/mods/tauntMod/taunts/11 Herb laugh.wav"),
	"12" : new Taunt("12", "Aah! Being rushed", "coui://ui/mods/tauntMod/taunts/12 Being rushed.wav"),
	"13" : new Taunt("13", "Sir, blame it on your ISP", "coui://ui/mods/tauntMod/taunts/13 Blame your isp.wav"),
	"14" : new Taunt("14", "Start the game already", "coui://ui/mods/tauntMod/taunts/14 Start the game.wav"),
	"15" : new Taunt("15", "Don't point that thing at me", "coui://ui/mods/tauntMod/taunts/15 Don't Point That Thing.wav"),
	"16" : new Taunt("16", "Enemy sighted", "coui://ui/mods/tauntMod/taunts/16 Enemy Sighted.wav"),
	"17" : new Taunt("17", "It is good to be the king", "coui://ui/mods/tauntMod/taunts/17 It Is Good.wav"),
	"18" : new Taunt("18", "Monk! I need a monk", "coui://ui/mods/tauntMod/taunts/18 I Need a Monk.wav"),
	"19" : new Taunt("19", "Long time no siege", "coui://ui/mods/tauntMod/taunts/19 Long Time No Siege.wav"),
	"20" : new Taunt("20", "My granny could scrap better than that", "coui://ui/mods/tauntMod/taunts/20 My granny.wav"),
	"21" : new Taunt("21", "Nice town, I'll take it", "coui://ui/mods/tauntMod/taunts/21 Nice Town I'll Take It.wav"),
	"22" : new Taunt("22", "Quit touchin me", "coui://ui/mods/tauntMod/taunts/22 Quit Touchin.wav"),
	"23" : new Taunt("23", "Raiding Party", "coui://ui/mods/tauntMod/taunts/23 Raiding Party.wav"),
	"24" : new Taunt("24", "Dadgum", "coui://ui/mods/tauntMod/taunts/24 Dadgum.wav"),
	"25" : new Taunt("25", "Smite Me", "coui://ui/mods/tauntMod/taunts/25 Smite Me.wav"),
	"26" : new Taunt("26", "The wonder! The Wonder! Noo", "coui://ui/mods/tauntMod/taunts/26 The wonder.wav"),
	"27" : new Taunt("27", "You play 2 hours to die like this?", "coui://ui/mods/tauntMod/taunts/27 You play 2 hours.wav"),
	"28" : new Taunt("28", "You should see the other guy", "coui://ui/mods/tauntMod/taunts/28 You Should See The Other Guy.wav"),
	"29" : new Taunt("29", "Roggan", "coui://ui/mods/tauntMod/taunts/29 Roggan.wav"),
	"30" : new Taunt("30", "Wololo", "coui://ui/mods/tauntMod/taunts/30 Wololo.wav"),
	"31" : new Taunt("31", "Attack an enemy now", "coui://ui/mods/tauntMod/taunts/31 Attack an Enemy Now.wav"),
	"32" : new Taunt("32", "Cease creating extra villagers", "coui://ui/mods/tauntMod/taunts/32 Cease Creating Extra Villagers.wav"),
	"33" : new Taunt("33", "Create extra villagers", "coui://ui/mods/tauntMod/taunts/33 Create Extra Villagers.wav"),
	"34" : new Taunt("34", "Build a navy", "coui://ui/mods/tauntMod/taunts/34 Build a Navy.wav"),
	"35" : new Taunt("35", "Stop building a navy", "coui://ui/mods/tauntMod/taunts/35 Stop building a Navy.wav"),
	"36" : new Taunt("36", "Wait for my signal to attack", "coui://ui/mods/tauntMod/taunts/36 Wait for My Signal to Attack.wav"),
	"37" : new Taunt("37", "Build a wonder", "coui://ui/mods/tauntMod/taunts/37 Build a Wonder.wav"),
	"38" : new Taunt("38", "Give me your extra resources", "coui://ui/mods/tauntMod/taunts/38 Give Me Your Extra Resources.wav"),
	"39" : new Taunt("39", "Ally", "coui://ui/mods/tauntMod/taunts/39 Ally.wav"),
	"40" : new Taunt("40", "Enemy", "coui://ui/mods/tauntMod/taunts/40 Enemy.wav"),
	"41" : new Taunt("41", "Neutral", "coui://ui/mods/tauntMod/taunts/41 Neutral.wav"),
	"42" : new Taunt("42", "What age are you in?", "coui://ui/mods/tauntMod/taunts/42 What Age Are You In.wav"),
}

function Taunt(word, name, path){

	this.word 	= word;
	this.name 	= name;
	this.path 	= path;
	this.buffer = undefined;

	this.load = function(callback){

		var self = this,
			request = new XMLHttpRequest();

		request.open("GET", this.path, true);
		request.responseType = "arraybuffer";

		request.onload = function(){

			context.decodeAudioData(request.response, function(buffer){

				self.buffer = buffer;

			}, function(error){ 
				console.error("Error while loading sound: " + this.path);
			});

		}

		request.send();
	}

	this.play = function(){

		var settings = decode(localStorage.settings);

		//Maximum of five taunts at the same time to prevent spamming
		if(context.activeSourceCount >= parseInt(settings.tauntsMax)) return;
		
		//Create Gain
		var volume = context.createGainNode();
		volume.gain.value = settings.tauntVolume / 10 * settings.master_volume / 100;

		//Create audio source
		var source = context.createBufferSource();
		source.buffer = this.buffer;

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
	}
}

//Load all the taunts
for(i in taunts){

	taunts[i].load();
}

