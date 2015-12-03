

function DoBackAndClean(){	
	Workflow.Back();
	//DB.Rollback();
}


function GetAllsActiveTask2() {
	var q = new Query();

	var queryText = "SELECT Id, FIO, Tel" + 
		" FROM Catalog_Client_Contact";

	if ($.Exists("searchAll")) {
		var searchString = $.searchAll;
		if ($.searchAll != null && $.searchAll != ""){
			var searchtail = " WHERE  (Contains(Ref, @Ref)";
			q.AddParameter("SearchText", searchString);
			queryText = queryText + searchtail;
		}
	}
	q.Text = queryText;

	return q.Execute().Unload();
}

function actionDoSelect(p){
	Vars.setClient(p);
	Workflow.Action("DoSelect",[]);
}