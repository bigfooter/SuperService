

function DoBackAndClean(){
	Workflow.Back();
	//DB.Rollback();
}



function GetAllsActiveContact(ref) {
	var q = new Query("SELECT CCC.Id, CCC.FIO, CCC.Tel, CCC.Position" +
		" FROM Catalog_Client_Contact CCC " +
		"WHERE Ref = @ref");

	q.AddParameter("ref", ref);

	return q.Execute().Unload();
}

function actionDoSelect(p){
	Vars.setClient(p);
	Workflow.Action("DoSelect",[]);
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
