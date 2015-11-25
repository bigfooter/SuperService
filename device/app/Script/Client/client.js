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