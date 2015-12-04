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