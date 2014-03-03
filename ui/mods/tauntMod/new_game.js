$(document).on('ready', function(){

	var prevLength = 0;

	//Lobby	
	$("#chat-bar .container_embed").bind("DOMSubtreeModified", function(){

		var message = $('.chat_message:last').text().trim().split(":")[1].trim();

		//Make sure it doesn't get called twice
		if(message == undefined || message == "") 
			return;
		//No new taunts are added
		if($(".chat_message").length == prevLength) 
			return;

		prevLength = $(".chat_message").length;

		//Loop through tauntPacks
		$.each(tauntPacks, function(k, v){

			//Loop through taunts
			for(var taunt in v.getTaunts()){

				//Found a taunt by match
				if(message.match(v.getTaunts()[taunt].getMatch()) && !v.getTaunts()[taunt].getReplace()){

					v.getTaunts()[taunt].play();
					return false;

				//Found a taunt by replaced value
				}else if(message.match(/^TauntMod\((.*)\)/) && message.match(/^TauntMod\((.*)\)/)[1].match(v.getTaunts()[taunt].getName())){

					v.getTaunts()[taunt].play();
					return false;
				}
			}
		});
	});

	$(".input_chat_text").bind("change", function(e){

		var val = $(this).val().trim();

		//Loop through all the TauntPacks
		$.each(tauntPacks, function(k, v){

			//Loop through all the taunts
			for(var taunt in v.getTaunts()){

				//Check if it matches with the taunt
				if(val.match(v.getTaunts()[taunt].getMatch())){

					//Does it want to be replaced
					if(v.getTaunts()[taunt].getReplace())
						val = "TauntMod(" + v.getTaunts()[taunt].getName() + ")";
					return false;
				}
			}
		});

		$(this).val(val);
	});
});