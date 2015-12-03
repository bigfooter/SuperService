function OnLoad(){

  getDetails($.param1);

}

function getDetails(eq){
  $.DescEQ.Text = eq.Description;
  $.SN.Text = eq.SerialNumber;
  $.ver.Text = eq.SoftwareVersion;
  if (eq.RemoteAccess){
    $.remote.Text = Trans("Yes");
    $.remoteDateBlock.Visible = true;
    $.remoteData.Text = eq.DataRemoteAccess;
  } else {
    $.remote.Text = Trans("No");
    $.remoteDateBlock.Visible = false;
  }

}
