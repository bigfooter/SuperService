

function DoBackAndClean(){
	Workflow.Back();
	//DB.Rollback();
}



function GetAllsActiveContact(ref) {
	var q = new Query("SELECT CC.Id, CC.Description AS FIO, CC.Tel, CC.Position" +
		" FROM Catalog_Client_Contacts CCC " +
		" LEFT JOIN Catalog_Contacts CC" +
		" ON CCC.Contact = CC.Id" +
		" WHERE CCC.Actual = 0 AND CCC.Ref = @ref");

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
