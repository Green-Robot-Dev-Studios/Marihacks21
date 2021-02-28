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

    //console.log(GET["class"][0]);

    var data = {
            active: -1,
        questions: [
            {answers: [], correct_answer: 0, question: ""},
        ]
    };

    var lclasses = await listClasses(uid);
    console.log(lclasses);

    if(lclasses.includes(GET["class"][0])){
        var cc = await getClass(uid, GET["class"][0]);
        data = cc;

        var ga = GET["answer"];
        if(ga){
            var nQs = data["questions"].length;

            var ans = 0;
            switch (ga[0].toLowerCase()) {
                case "a":
                    ans = 0;
                    break;
                case "b":
                    ans = 1;
                    break;
                case "c":
                    ans = 2;
                    break;
                case "d":
                    ans = 3;
                    break;
                default:
                    ans = 0;
            }
            if(GET["editedQ"]){
                console.log(GET["editedQ"][0]);
                data["questions"][GET["editedQ"][0]] = {answers: [GET[0][0],GET[1][0],GET[2][0],GET[3][0]], correct_answer: ans, question: GET["addedQuestion"][0]}
            }else{
                data["questions"].push({answers: [GET[0][0],GET[1][0],GET[2][0],GET[3][0]], correct_answer: ans, question: GET["addedQuestion"][0]});
            }
        }else{ //SHORT ANSWER
            if(GET["editedQ"]){
                data["questions"][GET["editedQ"][0]] = {answers: [GET[0][0]], correct_answer: 0, question: GET["addedQuestion"][0]}
            }else{
                data["questions"].push({answers: [GET[0][0]], correct_answer: 0, question: GET["addedQuestion"][0]});
            }
        }
    }else{
        //MULTIPLE CHOICE
        var ga = GET["answer"];
        if(ga){
            var ans = 0;
            switch (ga[0].toLowerCase()) {
                case "a":
                    ans = 0;
                    break;
                case "b":
                    ans = 1;
                    break;
                case "c":
                    ans = 2;
                    break;
                case "d":
                    ans = 3;
                    break;
                default:
                    ans = 0;
            }
            data["questions"][0]["answers"][0] = GET[0][0];
            data["questions"][0]["answers"][1] = GET[1][0];
            data["questions"][0]["answers"][2] = GET[2][0];
            data["questions"][0]["answers"][3] = GET[3][0];

            data["questions"][0]["correct_answer"] = ans;
            data["questions"][0]["question"] = GET["addedQuestion"][0];
        }else{ //SHORT ANSWER
            data["questions"][0]["answers"] = GET[0];
            data["questions"][0]["question"] = GET["addedQuestion"][0];
        }
    }

    console.log(data);

    updateClass(uid, GET["class"][0], data);

    window.location.replace("teacher.html");
}
