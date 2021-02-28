
async function entry(){
  var codeText = document.getElementById('classcode');
  codeText.innerHTML = "Class Code: " + await getClassroomCode(uid);

  var qList = document.getElementById('qList');

  //Listing all questions (BROKEN)
  var classroom = await getClassroom(uid);
  //console.log(qs[0]["questions"]);
  var qs = classroom[0]["questions"];
  console.log(classroom);

  var qListHtml = "";

  for(var num = 0; num < qs.length; num++){
      //console.log(qs[num]);
      qListHtml = qListHtml + `
                  <form class="question" action="addQuestion.html" method="get">
                      <input type="text" name="question" value="` + qs[num]["question"] + `" readonly>
                      <input type="submit" name="submit" value="Edit">
                      <input type="submit" name="submit" value="Send Question" formaction="sendQuestion.html">
                  </form>
      `;
  }

  qList.innerHTML = qListHtml;

}
