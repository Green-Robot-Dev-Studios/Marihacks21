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
    a1 = params["ans1"][0];
    a2 = params["ans2"][0];
    a3 = params["ans3"][0];
    a4 = params["ans4"][0];

    document.getElementById("q").innerHTML = question;
    document.getElementById("1").innerHTML = a1;
    document.getElementById("2").innerHTML = a2;
    document.getElementById("3").innerHTML = a3;
    document.getElementById("4").innerHTML = a4;

}

async function send() {
    // addStudentAnswer(teacherName, classToEdit, studentName, answer) {
    params = parseURLParams(window.location.search);

    var ans;
    if (document.getElementById("option-1").checked) ans = 0;
    if (document.getElementById("option-2").checked) ans = 1;
    if (document.getElementById("option-3").checked) ans = 2;
    if (document.getElementById("option-4").checked) ans = 3;

    await addStudentAnswer(params["t"][0], params["c"][0], params["n"][0], ans, params["ansNum"][0]);
    location.assign("waitingroom.html?code=" + params["code"][0] + "&name=" + params["n"][0]);
}
