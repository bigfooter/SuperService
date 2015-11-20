
var historyStart = undefined;
var historyStop = undefined;

//-------------------------------------------
var recvStartPeriod;
function setRecvStartPeriod(a){
	recvStartPeriod = a;
}

function getRecvStartPeriod(){
	return recvStartPeriod;
}
//-----------------------------------------
var recvStopPeriod;
function setRecvStopPeriod(a){
	recvStopPeriod = a;
}

function getRecvStopPeriod(){
	return recvStopPeriod;
}




// Begin Current Event ID
var currentEvent;

function setEvent(a){
	currentEvent = a;
}

function getEvent(){
	return currentEvent;
}
// End Current Event ID

