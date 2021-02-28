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
    updateClass(uid, GET["class"][0], theClass);
    ctd();
}

function cancelQ(){
    endQ();
}

function ctd(){
    window.location.replace("teacher.html");
}

async function entry(){
    var GET = parseURLParams(window.location.search);
    //console.log(GET["class"][0]);


    //db.collection("classroom").doc(uid).collection("classes").doc(GET["class"][0]).onSnapshot((qs) => {
    //    qs.forEach((doc) => {
    //        console.log(doc.data());
    //    });
    //});

}
