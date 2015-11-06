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
	 
	
}

function OnWorkflowForwarding(workflowName, lastStep, nextStep, parameters) {
	if (nextStep == "DirtyHack") {
		sendRequest($.sStaffName.Text, $.sClientName.Text, $.sComment.Text);
		if ($.Exists("sent")){
			$.Remove("sent");
			$.AddGlobal("sent", true);		
		} else {
			$.AddGlobal("sent", true);
		}
		$.submitButton.Text = "Отправить запрос";		
		$.sClientName.Text = "";
		$.sComment.Text = "";
		setCookie($.sStaffName.Text, "", "");
		Workflow.Refresh([]);
		
		return false;
		
	}
	
	if (nextStep == "DirtyHackClient") {
		if (sendClientRequest($.phone.Text, $.sClientName.Text, $.sComment.Text, $.contact.Text)) {
			if ($.Exists("sent")){
				$.Remove("sent");
				$.AddGlobal("sent", true);		
			} else {
				$.AddGlobal("sent", true);
			}
					
			$.sClientName.Text = "";
			$.sComment.Text = "";
			$.contact.Text = "";
			$.phone.Text = "";
			//setCookie($.sStaffName.Text, "", "");
			Workflow.Refresh([]);
		} else {
			$.submitButton.Text = "Отправить запрос";
			Workflow.Refresh([]);
		}
		return false;
		
	}
	return true;
}

