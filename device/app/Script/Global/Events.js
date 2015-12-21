// ------------------------ Application -------------------

function OnApplicationInit() {
    Variables.AddGlobal("lastDataSync", "-");
    Variables.AddGlobal("lastFtpSync", "-");
    //Когда будет возможность обратиться к глобальному модулю
 // if ($.Exists("appStatuses"))
	//	 $.Remove("appStatuses");
	//	 Variables.AddGlobal("appStatuses", new Dictionary());
	//	 Variables["appStatuses"].Add("UserInMskCO", Global.checkUsr());
}

function OnWorkflowStart(name) {
	 if ($.Exists("workflow"))
		  $.Remove("workflow");
	 Variables.AddGlobal("workflow", new Dictionary());
	 Variables["workflow"].Add("name", name);

   if (name == "Event"){
     GPS.StartTracking(-1);
     if($.Exists("onGPS")){
        $.AddGlobal("onGPS", true)
     }
    }
}

function OnApplicationBackground(workflow) {
	 	GPS.StopTracking();
}

function OnApplicationRestore(workflow) {
  if($.Exists("onGPS")){
	 	GPS.StartTracking(-1);
	}
}

function OnWorkflowForwarding(workflowName, lastStep, nextStep, parameters) {

  if (nextStep == "tasks"){
    GPS.StopTracking();
    $.Remove("onGPS");
  }



  if (nextStep == "Main" && workflowName == "Event"){
    GPS.StartTracking(-1);
    if($.Exists("onGPS")){
      $.AddGlobal("onGPS", true);
    }
  }
	return true;
}

function OnWorkflowBack(workflow, lastStep, nextStep) {
  if (nextStep == "Main" && workflow == "Event"){
    GPS.StartTracking(-1);
    if($.Exists("onGPS")){
      $.AddGlobal("onGPS", true);
    }
  }
}

function OnWorkflowFinished(workflow, reason) {
    if (reason == "rollback") {
      GPS.StopTracking();
      $.Remove("onGPS");
    }
}
