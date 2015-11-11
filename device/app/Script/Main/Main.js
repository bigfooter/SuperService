function OnLoading() {
	 var curUser = $.common.UserRef;		
	  if (curUser.Disabled) {
		  cleanBase();
	  }
}

// ------------------------ Main screen module ------------------------

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

//----------------Begin Info Block Visit---------------------------------
function GetToDayUnDoneRequestsCount(){//(searchText - строка поиска, getCount - получать ли количество[1-ДА,0-НЕТ])
	var q = new Query("SELECT DE.id FROM Document_Event DE WHERE DE.ActualEndDate >= @DateStart AND DE.ActualEndDate <= @DateEnd AND DE.Status = @StatusEx");
	
	//q.AddParameter("StatusComp", DB.Current.Constant.VisitStatus.Completed);
	q.AddParameter("StatusEx", DB.Current.Constant.StatusyEvents.Done);
	q.AddParameter("DateStart", DateTime.Now.Date);
	q.AddParameter("DateEnd", DateTime.Now.Date.AddDays(1));
	return q.ExecuteCount();
	
}

function GetToDayDoneRequestCount(){//(searchText - строка поиска, getCount - получать ли количество[1-ДА,0-НЕТ])
	var q = new Query("SELECT DE.id FROM Document_Event DE WHERE DE.StartDatePlan >= @DateStart AND DE.StartDatePlan < @DateEnd AND DE.Status == @StatusComp");	
	q.AddParameter("StatusComp",  DB.Current.Constant.StatusyEvents.Appointed);
	q.AddParameter("DateStart", DateTime.Now.Date);
	q.AddParameter("DateEnd", DateTime.Now.Date.AddDays(1));
	return q.ExecuteCount();
}

function GetToDayUnDoneRequestsMonthCount(){//(searchText - строка поиска, getCount - получать ли количество[1-ДА,0-НЕТ])
	var q = new Query("SELECT Id FROM Document_Visit " +
			"WHERE Document_Visit.PlanStartDataTime BETWEEN " +
			"datetime('now', 'start of month') AND " +
			"datetime('now', 'start of month', '+1 months') " +
			"AND Document_Visit.Status = @StatusEx");
	 
	//q.AddParameter("StatusComp", DB.Current.Constant.VisitStatus.Completed);
	q.AddParameter("StatusEx", DB.Current.Constant.VisitStatus.Expected);
	return q.ExecuteCount();
	
}


function GetToDayDoneRequestMonthCount(){//(searchText - строка поиска, getCount - получать ли количество[1-ДА,0-НЕТ])
	var q = new Query("SELECT Id " +
			"FROM Document_Visit " +
			"WHERE Document_Visit.FactEndDataTime " +
			"BETWEEN datetime('now', 'start of month') " +
			"AND datetime('now', 'start of month', '+1 months') " +
			"AND Document_Visit.Status = @StatusComp");
	
	q.AddParameter("StatusComp", DB.Current.Constant.VisitStatus.Completed);
	return q.ExecuteCount();
}

function GetBeginOfCurrentMonth(){
	var mth = "";
	if (DateTime.Now.Month < 10){
		mth = "0"+ DateTime.Now.Month;
	} else {
		mth = DateTime.Now.Month;
	}
	return "01." + mth + "." + DateTime.Now.Year + " 00:00:00";
}

function GetEndOfCurrentMonth(){
	var mth = "";
	if (DateTime.Now.Month < 10){
		mth = "0"+ DateTime.Now.Month;
	} else {
		mth = DateTime.Now.Month;
	}
	return DateTime.DaysInMonth(DateTime.Now.Year, DateTime.Now.Month) + "." + mth + "." + DateTime.Now.Year + " 00:00:00";
}
//----------------End Info Block Visit---------------------------------