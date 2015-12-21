function DoBackAndClean(){
	Workflow.Back();
	//DB.Rollback();
}

function DoActionAndSave(step, req, cust, outlet) {

}

function GetEventDetails() {
	return Vars.getEvent();
}

function PhoneExists(call) {
	if (IsNullOrEmpty(call)){
		return false;
	} else {
		return true;
	}
}



function MoreMakeContactCall(tel){
	Dialog.Question("#call# "+ tel + "?", PhoneCall, tel);
}

function PhoneCall(answ, tel){
	if (answ == DialogResult.Yes) {
		Phone.Call(tel);
	}
}

function setCoordinats(sender, outlet, param1){
	var location = GPS.CurrentLocation;
	if(ActualLocation(location)) {
	    var objOutlet = outlet.GetObject();
	    objOutlet.Latitude = location.Latitude;
	    objOutlet.Longitude = location.Longitude;
	    objOutlet.Save(false);
	    $.Coordinats = location.Latitude + "; " + location.Longitude;
	    Workflow.Refresh([param1]);
	} else {
		Dialog.Message("Не удалось получить координаты.");
	}
}

function updateCoordinats(outlet, param1) {
	Dialog.Choose("Координаты", [["update", "Обновить"],["copy", "Скопировать"], ["cut", "Удалить"]] , coordinatsCallBack, [outlet, param1]);
}

function coordinatsCallBack(state, args){
	var obj = state[0].GetObject();
	var location = GPS.CurrentLocation;

	if (args.Result == "update") {
		if(ActualLocation(location)) {
		obj.Latitude = location.Latitude;
		obj.Longitude = location.Longitude;
		obj.Save(false);
		Workflow.Refresh([state[1]]);
		} else {
			Dialog.Message("Не удалось получить координаты.");
		}
	}

	if (args.Result == "copy") {
		Clipboard.SetString(obj.Latitude + "; " + obj.Longitude);
	}

	if (args.Result == "cut") {
		obj.Latitude = 0;
		obj.Longitude = 0;
		obj.Save(false);
		Workflow.Refresh([state[1]]);
	}
}
