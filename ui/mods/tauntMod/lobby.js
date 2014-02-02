$(document).on('ready', function(){

	//Lobby
	$(".div_chat_feed").bind("DOMSubtreeModified", function(){

		var message = $($(this).children()[$(this).children().length - 1]).text().trim().split(":")[1];

		//Make sure it doesn't get called twice
		if(message == undefined || message == "") return;
		if($('.chat_message_text:last').attr("tauntchecked") == "tauntchecked") return;
		$('.chat_message_text:last').attr("tauntchecked", "tauntchecked");

		message = message.trim()

		//Search for Taunt(Name)
		var match = message.match(/^TauntMod\((.*)\)/);

		//We found something
		if(match){

			//Loop through all taunts
			$.each(taunts, function(k, v){
				//Found a match
				if(match[1] == v.name){
					//Play it
					v.play();
					return;
				}
			});
		}

		if(taunts[message]) taunts[message].play();
	});

	$(".input_chat_text").bind("change", function(e){

		var val = $(this).val().trim();

		$.each(taunts, function(k, v){
 			
 			//Check if the chatmessage is the taunt
			if(val == v.word){

				//Replace it and exit the loop
				val = "TauntMod(" + v.name + ")";
				return false;
			}
		})

		$(this).val(val);
	});
});