function getEqHistory(eq){
  var q = new Query("SELECT CEEH.[Id], CEEH.[Ref], CEEH.[Period], " +
	  "ESE.Description AS Result, CEEH.[Comment], CU.Description AS Executor " +
    "FROM [Catalog].[Equipment_EquiementsHistory] CEEH " +
    "LEFT JOIN [Enum].[ResultEvent] ESE ON CEEH.Result = ESE.Id " +
    "LEFT JOIN [Catalog].[User] CU ON CEEH.Executor = CU.Id " +
    "WHERE CEEH.Ref = @eq");

  q.AddParameter("eq", eq);

  return q.Execute();    
}
