function parseURLParams(url) {
    var queryS = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryS, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);
        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}


async function entry(){
      var codeText = document.getElementById('classcode');
      codeText.innerHTML = "Class Code: " + await getClassroomCode(uid);


      var qList = document.getElementById('qList');

      var classList = document.getElementById('class');
      var classes = await listClasses(uid);
      //console.log(classes);
      var GET = parseURLParams(window.location.search);
      if(GET)
          var selectedClass = (GET["class"]) ? GET["class"][0] : classes[0];

      var cListHtml = "";
      for(var i = 0; i < classes.length; i++){
          cListHtml = cListHtml + `<option value="`+ classes[i]+`" ` + ((classes[i]==selectedClass) ? 'selected="selected"' : '' )+ `>`+ classes[i] +`</option>`;
      }
      classList.innerHTML = cListHtml;


      var classroom = await getClass(uid, selectedClass);
      //console.log(qs[0]["questions"]);
      var qs = classroom["questions"];
      //console.log(classroom);

      var qListHtml = "";
      for(var i = 0; i < qs.length; i++){
              //console.log(qs[num]);
              qListHtml = qListHtml + `
                          <form class="question" action="addQuestion.html" method="get">
                              <input type="text" name="class" value="` + selectedClass +  `" hidden>
                              <input type="text" name="editQuestion" value="` + i +  `" hidden>
                              <input type="text" name="question" value="` + qs[i]["question"] + `" readonly>
                              <input type="submit" name="submit" value="Edit">
                              <input type="submit" name="submit" value="Send Question" formaction="sendQuestion.html">
                          </form>
              `;
      }

      qList.innerHTML = qListHtml;

}
