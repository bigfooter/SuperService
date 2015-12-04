

function DoBackAndClean(){	
	Workflow.Back();
	//DB.Rollback();
}



function GetAllsActiveContact() {
	var q = new Query();

	var queryText = "SELECT Id, FIO, Tel" + 
		" FROM Catalog_Client_Contact";


	q.Text = queryText;
	return q.Execute().Unload();
}

function actionDoSelect(p){
	Vars.setClient(p);
	Workflow.Action("DoSelect",[]);
}