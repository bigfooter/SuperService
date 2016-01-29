function OnLoad(){

  getDetails($.param1);

}
// # Begin Parameters

function GetSnapShotPath(fileName) {
  var q = new Query("SELECT FullFileName" +
                    " FROM Catalog_Equipment_Files" +
                    " WHERE FileName == @fn");

  q.AddParameter("fn", fileName);
  return q.ExecuteScalar();
}

function GetEqParams(eqRef) {
  var q = new Query("SELECT CEO.Description AS Parameter, CEP.Val Val, ETDP.Name AS Type " +
  "FROM Catalog_Equipment_Parameters CEP " +
  "LEFT JOIN Catalog_EquipmentOptions CEO " +
  "ON CEP.Parameter = CEO.Id  " +
  "LEFT JOIN Enum_TypesDataParameters ETDP " +
  "ON CEO.DataTypeParameter = ETDP.ID " +
  "WHERE CEO.DisplayingBMA = 1 AND CEP.Ref = @eqRef " +
	"ORDER BY CEP.LineNumber");

  q.AddParameter("eqRef", eqRef);
  return q.Execute();
}

// # End Parameters

function getDetails(eq){
  $.DescEQ.Text = eq.Description;
  // $.SN.Text = eq.SerialNumber;
  // $.ver.Text = eq.SoftwareVersion;
  // if (eq.RemoteAccess){
  //   $.remote.Text = Trans("Yes");
  //   $.remoteDateBlock.Visible = true;
  //   $.remoteData.Text = eq.DataRemoteAccess;
  // } else {
  //   $.remote.Text = Trans("No");
  //   $.remoteDateBlock.Visible = false;
  // }

}
