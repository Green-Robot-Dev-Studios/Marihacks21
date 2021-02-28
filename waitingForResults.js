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

function pauseTimer(){

}

async function endQ(){
    var GET = parseURLParams(window.location.search);
    var theClass = await getClass(uid, GET["class"][0]);
    theClass["active"] = -1;
    await updateClass(uid, GET["class"][0], theClass);
    dashboard();
}

function cancelQ(){
    endQ();
}

async function ctd(){
    var GET = parseURLParams(window.location.search);
    var cc = await getClass(uid, GET["class"][0]);
    var inc = cc["active"];

    if(inc < cc["questions"].length-1){
        inc++;
        cc["active"] = inc;
        await updateClass(uid, GET["class"][0], cc);
    }else{
        endQ();
    }
}

function dashboard(){
    window.location.replace("teacher.html");
}

async function entry(){
    var GET = parseURLParams(window.location.search);
    //console.log(GET["class"][0]);
    //Students have answered
    var cc = await getClass(uid, GET["class"][0]);
    mainHeader = document.getElementById('bigText');
    mainHeader.innerHTML = "Waiting for responses to '"+ cc["questions"][cc["active"]]["question"] +"'";

    var header = document.getElementById('studentsAnswered');
    var counter = 0;

    var students = await getStudents(uid, GET["class"][0]);



    await db.collection("classroom").doc(uid).collection("classes").doc(GET["class"][0]).collection("student_name").onSnapshot((qs) => {
        counter = 0;
        qs.forEach(async (doc) => {
            var ans = await getStudentAnswers(uid, GET["class"][0], doc.id);
            if(ans[cc["active"]] !== undefined){
                counter++;
                header.innerHTML = counter + " Students have answered";
            }
        });
    });

}
