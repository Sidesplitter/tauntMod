var colors = [
	"NONE",
	"PURPLE",	
	"RED",		
	"ORANGE",	
	"BLUE",		
	"WHITE",		
	"YELLOW",	
	"GREEN", 	
	"BLACK", 	
	"DARK BLUE",	
	"PINK",		
	"BROWN"		
]

model.addSettingGroup("UI", "FAVORITE COMMANDER & COLOR");
model.addSetting_DropDown("Color", "favColor", "UI", colors, 0, "FAVORITE COMMANDER & COLOR");
model.addSetting_DropDown("Alt. Color", "favColorAlt", "UI", colors, 0, "FAVORITE COMMANDER & COLOR");