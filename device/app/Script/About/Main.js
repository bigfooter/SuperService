
function SendLog(){
	// $.sendButton.Visible = false;
	// $.dataSyncLayout.Visible = true;
	// $.dataSyncIndicator.Start();

	var result = Application.SendDatabase();

	// $.sendButton.Visible = true;
	// $.dataSyncLayout.Visible = false;
	// $.dataSyncIndicator.Stop();

	if (result)
		Dialog.Message(Translate["#success#"]);
	else
		Dialog.Message(Translate["#noSuccess#"]);
}

function CloseMenu() {
    var sl = Variables["swipe_layout"];
    if (sl.Index == 1) {
        sl.Index = 0;
    }
    else if (sl.Index == 0) {
        sl.Index = 1;
    }
}

function OpenMenu() {
    var sl = Variables["swipe_layout"];
    if (sl.Index == 1) {
        sl.Index = 0;
    }
    else if (sl.Index == 0) {
        sl.Index = 1;
    }
}

function getAppVersion(){
	var solVersion = new Query("SELECT Value FROM ___SolutionInfo WHERE key='version'");
	return solVersion.ExecuteScalar();
}
