console.log("TEST");

model.addSettingGroup("AUDIO", "TAUNTMOD");
model.addSetting_Slider("VOLUME", "tauntVolume", "AUDIO", 0, 10, 10, "TAUNTMOD");
model.addSetting_Text("MAX. TAUNTS PLAYING", "tauntsMax", "AUDIO", "Number", "5", "TAUNTMOD");