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
    var GET = parseURLParams(window.location.search);

    var selectedClass;
    var selectedQuestion;
    if(GET["class"]){
        selectedClass = await getClass(uid, GET["class"][0]);
        selectedQuestion = GET["editQuestion"][0];
    }
    selectedClass["active"] = selectedQuestion;
    
    updateClass(uid, GET["class"][0], selectedClass);

    console.log(selectedClass);
}
