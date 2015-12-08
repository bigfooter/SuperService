function OnLoad() {
	if ($.Exists("map")){
      $.map.AddMarker($.param1.Description, $.param1.Latitude, $.param1.Longitude, "orange");
  }		
}
