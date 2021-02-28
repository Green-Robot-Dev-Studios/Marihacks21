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

var params = parseURLParams(window.location.search);
var code = params["code"][0];
var name = params["name"][0];
console.log(code);
async function entry() {
    var classroom;
    await db.collection("classroom").where("code", "==", code).get().then((docs) => {
        docs.forEach((doc) => {
            //console.log(doc.id);
            classroom = doc.id;
        });
    });
    db.collection("classroom").doc(classroom).collection("classes").where("active", "!=", -1).onSnapshot((qs) => {
        qs.forEach(async (doc) => {
            var active = doc.data()["active"];
            console.log(doc.data());
            var q = [];
            q = await db.collection("classroom").doc(classroom).collection("classes").doc(doc.id).collection("student_name").doc(name).get();
            try {
                q = q.data()["questions"];
            } catch {
                console.log(doc.data()["questions"][active]["answers"].length);
                if (doc.data()["questions"][active]["answers"].length == 1) {
                    location.assign("shortAnswer.html?q=" + doc.data()["questions"][active]["question"] + "&t=" + classroom + "&c=" + doc.id + "&n=" + name + "&code=" + code + "&ansNum=" + active);
                } else if (doc.data()["questions"][active]["answers"].length == 4) {
                    location.assign("multiplechoice.html?q=" + doc.data()["questions"][active]["question"] + "&t=" + classroom + "&c=" + doc.id + "&n=" + name + "&code=" + code + "&ans1=" + doc.data()["questions"][active]["answers"][0] + "&ans2=" + doc.data()["questions"][active]["answers"][1] + "&ans3=" + doc.data()["questions"][active]["answers"][2] + "&ans4=" + doc.data()["questions"][active]["answers"][3] + "&ansNum=" + active);
                }
            }
            //console.log(q, active);
            var flag = true;
            for (i of q) {
                //console.log("here", i);
                if (i[active] != undefined) {
                    //console.log("already answered ", i[active]);
                    flag = false;
                }
            }
            if (flag) {
                //console.log(doc.data()["questions"][active]["answers"].length);
                if (doc.data()["questions"][active]["answers"].length == 1) {
                    location.assign("shortAnswer.html?q=" + doc.data()["questions"][active]["question"] + "&t=" + classroom + "&c=" + doc.id + "&n=" + name + "&code=" + code + "&ansNum=" + active);
                } else if (doc.data()["questions"][active]["answers"].length == 4) {
                    location.assign("multiplechoice.html?q=" + doc.data()["questions"][active]["question"] + "&t=" + classroom + "&c=" + doc.id + "&n=" + name + "&code=" + code + "&ans1=" + doc.data()["questions"][active]["answers"][0] + "&ans2=" + doc.data()["questions"][active]["answers"][1] + "&ans3=" + doc.data()["questions"][active]["answers"][2] + "&ans4=" + doc.data()["questions"][active]["answers"][3] + "&ansNum=" + active);
                }
            }
        });
    });
    //console.log(classroom);
}
