
//---------------Common functions-----------
function PullArray(arr, ind){
	return arr[ind];	
}

function GenerateGuid() {

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function test(a){
	Console.WriteLine('===== test = ' + a);
	return a;
}

function testInDialog(s){
	Dialog.Debug(s);
	return s;
}

function Trans(txt){
	return Translate["#" + txt + "#"];
}


function IsNullOrEmpty(val1) {
    return String.IsNullOrEmpty(val1);
}


function makeCall(num){
	Phone.Call(num);
}

function GetUnloadCount(rs){
	return rs.Count();	
}

function Inversion(val){
	if (val){
		return false;
	} else {
		return true;
	}
}

//-----------------Dialog handlers-----------------

//Íóæíî ïåðåíåñòè ýòó ïðîâåðêó â ñîáûòèå ïðè ñòàðòå ïðèëîæåíèÿ


function checkFieldLength(sender, cutlength){
	if (StrLen(sender.Text)> cutlength) {
		sender.Text = Left(sender.Text, cutlength);
	}
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