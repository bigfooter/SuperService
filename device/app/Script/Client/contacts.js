

function DoBackAndClean(){
	Workflow.Back();
	//DB.Rollback();
}



function GetAllsActiveContact(ref) {
	var q = new Query("SELECT Id, FIO, Tel" +
		" FROM Catalog_Client_Contact " +
		"WHERE Ref = @ref");

	q.AddParameter("ref", ref);

	return q.Execute().Unload();
}

function actionDoSelect(p){
	Vars.setClient(p);
	Workflow.Action("DoSelect",[]);
}
