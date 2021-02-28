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

var params;

async function entry() {
    params = parseURLParams(window.location.search);
    question = params["q"][0];

    document.getElementById("q").innerHTML = question;
}

async function send() {
    // addStudentAnswer(teacherName, classToEdit, studentName, answer) {
    params = parseURLParams(window.location.search);
    await addStudentAnswer(params["t"][0], params["c"][0], params["n"][0], document.getElementById("i").value);
    location.assign("waitingroom.html?code=" + params["code"][0] + "&name=" + params["n"][0]);
}
