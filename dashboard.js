async function entry(){
  var codeText = document.getElementById('classcode');
  codeText.innerHTML = "Class Code: " + await getClassroomCode(uid);

  //Listing all questions (BROKEN)
  var qs = await getClassroom(uid)[0][4];
  console.log(qs);

  for(var num = 0; num < qs.length; num++){
      console.log(qs[num]);
  }

}
