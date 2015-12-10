function DoBackAndClean(){
	Workflow.Back();
	//DB.Rollback();
}

function GetEventDetails() {

	return Vars.getEvent();
}

function GetExecutedTasks(event) {
	var query = new Query("SELECT Document_Event_Equipments.Id, Document_Event_Equipments.Ref, Catalog_Equipment.Description, Document_Event_Equipments.Terget, Document_Event_Equipments.Comment, Enum_StatusyEvents.Name FROM   Document_Event_Equipments LEFT JOIN Catalog_Equipment ON Document_Event_Equipments.Equipment = Catalog_Equipment.Id LEFT JOIN Enum_StatusyEvents ON Document_Event_Equipments.Result = Enum_StatusyEvents.Id WHERE Document_Event_Equipments.Ref = @ref AND  Enum_StatusyEvents.Name = @result ");
//		var query = new Query("select * from Document_Event_Equipments WHERE Ref = @ref AND  Result = @result");


	query.AddParameter("ref", event);
	query.AddParameter("result", "Done");

//Dialog.Debug(event);

	return query.Execute();
}

function GetNotExecutedTasks(event) {
	var q = new Query("SELECT Document_Event_Equipments.Id, Document_Event_Equipments.Ref, Catalog_Equipment.Description, Document_Event_Equipments.Terget, Document_Event_Equipments.Comment, Enum_StatusyEvents.Name FROM   Document_Event_Equipments LEFT JOIN Catalog_Equipment ON Document_Event_Equipments.Equipment = Catalog_Equipment.Id LEFT JOIN Enum_StatusyEvents ON Document_Event_Equipments.Result = Enum_StatusyEvents.Id WHERE Document_Event_Equipments.Ref = @ref AND  Enum_StatusyEvents.Name = @result ");
//		var query = new Query("select * from Document_Event_Equipments WHERE Ref = @ref AND  Result = @result");


	q.AddParameter("ref", event);
	q.AddParameter("result", "Appointed");

	//q.AddParameter("planDate", DateTime.Now.Date);
	//q.AddParameter("outlet", visit.Outlet);
	//q.AddParameter("ref", visit);
	//q.AddParameter("result", true);
	return q.Execute();
}

function CompleteTheTask(itask, event) {
//	Dialog.Debug(itask);
	var event_task = CreateVisitTaskValueIfNotExists(itask, event);

	var event_task_obj = event_task.GetObject();
	event_task_obj.Result = "@ref[Enum_StatusyEvents]:81998d6c-e971-8f4d-4fbb-bd4d3b61e737";
	DB.Delete(itask);
	event_task_obj.Save();
//Dialog.Debug(itask);
	if (Variables.Exists("itask"))

		Workflow.Refresh([ $.itask, event_task_obj.Id ]);


	else
		Workflow.Refresh([]);

}

function CreateVisitTaskValueIfNotExists(itask, event) {
	var query = new Query("SELECT Document_Event_Equipments.Id FROM Document_Event_Equipments WHERE Document_Event_Equipments.Ref = @Event AND  Document_Event_Equipments.Comment = @Text");
	query.AddParameter("Event", itask);

	///Dialog.Debug(itask);
	query.AddParameter("Text", itask.Comment);
	var taskValue = query.ExecuteScalar();
	if (taskValue == null) {
		taskValue = DB.Create("Document.Event_Equipments");
		taskValue.id = itask.id;
		taskValue.Ref = itask.Ref;
		taskValue.Equipment = itask.Equipment;
		taskValue.Comment = itask.Comment;
		taskValue.Terget = itask.Terget;
		//Dialog.Debug(taskValue.TextTask);
		taskValue.TaskRef = itask;
		taskValue.Save();
		taskValue = taskValue.Id;
		//Dialog.Debug(taskValue.Id);
		//Dialog.Debug("comment ", taskValue.TextTask);
	}

	return taskValue;
}

function RetrieveTask(executedTask) {
	var task_obj = executedTask.GetObject();
	task_obj.Result = "@ref[Enum_StatusyEvents]:8d300e1c-3261-e745-4046-0ae57541898b";
	task_obj.Save();

	if (Variables.Exists("itask"))
		Workflow.Refresh([ $.itask ]);
	else
		Workflow.Refresh([]);
}

function FormatDate(datetime) {
	return Format("{0:g}", Date(datetime).Date);
}

function GetTargetText(text) {
	if (String.IsNullOrEmpty(text))
		return Translate["#noDescriGiven#"];
	else
		return text;
}


function actionDoSelect(p){
	Vars.setTask(p);
	Dialog.Debug(Vars.setTask(p));
	Workflow.Action("Task",[]);
}

function AddSnapshot(sender, objectRef, eqRef) { // optional: title, path
		var listChoice = new List;
		listChoice.Add([0, Translate["#addFromGallery#"]]);
		listChoice.Add([1, Translate["#makeSnapshot#"]]);

		Dialog.Choose(Translate["#snapshot#"], listChoice, AddSnapshotHandler, [objectRef,eqRef]);
}

function SnapshotActions(sender, objectRef, eqRef, pictId) { // optional: title, path
		var listChoice = new List;
		listChoice.Add([0, Translate["#DeleteSnapShot#"]]);

		Dialog.Choose(Translate["#snapshot#"], listChoice, SnapshotActionsHandler, [objectRef, eqRef, pictId]);
}

function SnapshotActionsHandler(state, args){
		if (parseInt(args.Result)==parseInt(0)){
				DeleteSnapShot(state[0], state[1], state[2]);
		}
}

function AddSnapshotHandler(state, args) {
	var objRef = state[0];
	var eqRef = state[1];


	if (parseInt(args.Result)==parseInt(0)){ 	//Gallery answer
		ChooseFromGallery(objRef, eqRef);
	}

	if (parseInt(args.Result)==parseInt(1)){ 	//SnapshotAnswer
		MakeSnapshot(objRef, eqRef);
	}

}

function ChooseFromGallery(objRef, eqRef) {
	FileSystem.CreateDirectory(String.Format("/private/{0}", GetParentFolderName(objRef)));

	var pictId = Global.GenerateGuid();
	var path = GetPrivateImagePath(objRef, pictId, ".jpg");
	Gallery.Size = 150;
	Gallery.Copy(path, SaveImage, [objRef, eqRef, pictId]);
}

function MakeSnapshot(objRef, eqRef) {
	FileSystem.CreateDirectory(String.Format("/private/{0}", GetParentFolderName(objRef)));

	var pictId = Global.GenerateGuid();
	var path = GetPrivateImagePath(objRef, pictId, ".jpg");
	Camera.Size = 150;
	Camera.Path = path;
	Camera.MakeSnapshot(path, 150, SaveImage, [objRef, eqRef, pictId]);
}

function GetSharedImagePath(objectID, pictID, pictExt) {
	var objectType = GetParentFolderName(objectID);
	var r = "/shared/" + objectType + "/" + objectID.Id.ToString() + "/"
    + pictID + pictExt;
	return r;
}

function GetPrivateImagePath(objectID, pictID, pictExt) {
	var objectType = GetParentFolderName(objectID);
	var r = "/private/" + objectType + "/" + objectID.Id.ToString() + "/"
    + pictID + pictExt;
	return r;
}

function GetPrivateImage(objectID, pictID) {
	var objectType = GetParentFolderName(objectID);
	var r = "/private/" + objectType + "/" + objectID.Id.ToString() + "/"
    + pictID + ".jpg";
	return r;
}

function GetParentFolderName(entityRef) {
	var folder;

	if (getType(entityRef.Ref) == "System.String")
		folder = entityRef.Metadata().TableName;
	else{
		folder = entityRef.Ref.Metadata().TableName;
	}
	folder = StrReplace(folder, "_", ".");
	folder = Lower(folder);

	return folder;
}

function SaveImage(state, args){
		if (args.Result){
			objSnapShot = DB.Create("Document.Event_Photos");
			objSnapShot.Ref = state[0];
			objSnapShot.Equipment = state[1];
			objSnapShot.UIDPhoto = state[2];
			objSnapShot.Save(false);
			Workflow.Refresh();
		}
}

function isSnapShotInEventExists(event){
		var q = new Query("Select DEP.Id From Document_Event_Photos DEP WHERE DEP.Ref == @event");
		q.AddParameter("event", event);
		if (q.ExecuteCount() > 0) {
			return true;
		} else {
			return false;
		}
}

function GetSnapShots(event, eq) {
		var q = new Query("Select DEP.Id, DEP.UIDPhoto From Document_Event_Photos DEP WHERE DEP.Ref == @event AND DEP.Equipment == @eq");
		q.AddParameter("event", event);
		q.AddParameter("eq", eq);

		return q.Execute();
}

function SnapshotExists(event, eq, pictId) {
		var q = new Query("Select DEP.UIDPhoto From Document_Event_Photos DEP WHERE DEP.Ref == @event AND DEP.Equipment == @eq AND DEP.UIDPhoto == @pict");
		q.AddParameter("event", event);
		q.AddParameter("eq", eq);
		q.AddParameter("pict", pictId);
		var filename = q.ExecuteScalar();
		var fileFound = !String.IsNullOrEmpty(filename);
		var fileExists = (fileFound ? FileSystem.Exists(GetPrivateImagePath(event, pictId, ".jpg")) : false);
		return fileFound && fileExists;
}

function DeleteSnapShot(event, eq, pictId) {
	q = new Query("Select DEP.Id Document_Event_Photos DEP WHERE DEP.Ref == @event AND DEP.Equipment == @eq AND DEP.UIDPhoto == @pict");
	q.AddParameter("event", event);
	q.AddParameter("eq", eq);
	q.AddParameter("pict", pictId);
	res = q.ExecuteScalar();
	DB.Delete(res);
	FileSystem.Delete(GetPrivateImagePath(event, pictId, ".jpg"));
	Workflow.Refresh();
}
