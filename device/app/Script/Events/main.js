function OnLoading(){
	SetListType();
}

function CloseMenu() {
    var sl = Variables["swipe_layout"];
    if (sl.Index == 1) {
        sl.Index = 0;
    }
    else if (sl.Index == 0) {
        sl.Index = 1;
    }
}

function OpenMenu() {
    var sl = Variables["swipe_layout"];
    if (sl.Index == 1) {
        sl.Index = 0;
    }
    else if (sl.Index == 0) {
        sl.Index = 1;
    }
}

function filterDateCaption(dt){
	if (dt != null){
		return String.Format("{0:dd.MM.yyyy}", DateTime.Parse(dt));
	} else {
		return "";
	}
}

function ClearFilter(){
	recvStartPeriod = undefined;
	recvStopPeriod = undefined;
	Workflow.Refresh([]);
}


function SetListType() {
    if ($.Exists("visitsType") == false)
        $.AddGlobal("visitsType", "planned");
    else
        return $.visitsType;
}

function ChangeListAndRefresh(control) {
    $.Remove("visitsType");
    $.AddGlobal("visitsType", control);
    Workflow.Refresh([]);
}

function GetTodaysActiveTask() {
	var q = new Query();

	var queryText = "SELECT DE.id AS Id, CC.Description AS Description, strftime('%d.%m %H:%M', DE.StartDatePlan) AS StartTime, CC.Address AS Address" + 
		" FROM Document_Event DE LEFT JOIN Catalog_Client CC ON DE.Client = CC.Id" + 
		" WHERE DE.ActualEndDate >= @DateStart AND DE.ActualEndDate <= @DateEnd AND DE.Status = @StatusEx";

	if ($.Exists("searchToDay")) {
		var searchString = $.searchToDay;
		if (searchString != null && searchString != ""){
			var searchtail = " AND  (Contains(CC.Description, @SearchText) OR Contains(CC.Address , @SearchText))";
			q.AddParameter("SearchText", searchString);
			queryText = queryText + searchtail;
		}
	}
	q.Text = queryText;
	//q.AddParameter("StatusComp", DB.Current.Constant.VisitStatus.Completed);
	q.AddParameter("StatusEx", DB.Current.Constant.StatusyEvents.Done);
	q.AddParameter("DateStart", DateTime.Now.Date);
	q.AddParameter("DateEnd", DateTime.Now.Date.AddDays(1));
	
	return q.Execute().Unload();
}

function findtodaytext(key){
	$.Remove("searchToDay");
	$.AddGlobal("searchToDay", key);
	Workflow.Refresh([]);
}

function findinalltext(key){
	$.Remove("searchAll");
	$.AddGlobal("searchAll", key);
	Workflow.Refresh([]);
}

function GetAllsActiveTask() {
	var q = new Query();

	var queryText = "SELECT DE.id AS Id, CC.Description AS Description, strftime('%d.%m %H:%M', DE.StartDatePlan) AS StartTime, CC.Address AS Address" + 
		" FROM Document_Event DE LEFT JOIN Catalog_Client CC ON DE.Client = CC.Id" + 
		" WHERE DE.Status = @StatusEx";

	if ($.Exists("searchAll")) {
		var searchString = $.searchAll;
		if (searchString != null && searchString != ""){
			var searchtail = " AND  (Contains(CC.Description, @SearchText) OR Contains(CC.Address , @SearchText))";
			q.AddParameter("SearchText", searchString);
			queryText = queryText + searchtail;
		}
	}
	q.Text = queryText;
	//q.AddParameter("StatusComp", DB.Current.Constant.VisitStatus.Completed);
	q.AddParameter("StatusEx", DB.Current.Constant.StatusyEvents.Done);
	
	return q.Execute().Unload();
}