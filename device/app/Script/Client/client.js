function OnLoad(){
 GetClientDetails();
}

function DoBackAndClean(){	
	Workflow.Back();
	//DB.Rollback();
}

function DoActionAndSave(step, req, cust, outlet) {
		
}

function GetClientDetails() {
	var client = Vars.getClient();

	$.Description.Text = client.Description;
$.Address.Text = client.Address;
	return Vars.getClient();

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