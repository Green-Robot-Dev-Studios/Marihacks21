async function entry(){
  var codeText = document.getElementById('classcode');
  codeText.innerHTML = "Class Code: " + await getClassroomCode(uid);





}
