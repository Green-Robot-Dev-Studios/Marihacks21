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


function entry(){
    var GET = parseURLParams(window.location.search);
    var aArea = document.getElementById('qArea');
    aArea.innerHTML = (GET["question"]) ? GET["question"] : "";

    var aArea = document.getElementById('answerArea');
    var answerInput = "";
    var qType = GET["questionType"];
    if(qType){
        if(qType == "multipleChoice"){
            answerInput = `
                <input type="text" name="0" value="" placeholder="Answer A"></input>
                <input type="text" name="1" value="" placeholder="Answer B"></input>
                <input type="text" name="2" value="" placeholder="Answer C"></input>
                <input type="text" name="3" value="" placeholder="Answer D"></input><br>
                <input type="text" name="answer" value="" placeholder="Answer: (Enter A, B, C or D)"></input>

            `;
        }else if(qType == "shortAnswer"){
            answerInput = `
                <textarea name = "0"
                          rows = "10"
                          cols = "80" placeholder="Enter the answer." id="aArea"></textarea>

            `;
        }
    }else{
        answerInput = `
            <input type="text" name="0" value="" placeholder="Answer A"></input>
            <input type="text" name="1" value="" placeholder="Answer B"></input>
            <input type="text" name="2" value="" placeholder="Answer C"></input>
            <input type="text" name="3" value="" placeholder="Answer D"></input><br>
            <input type="text" name="answer" value="" placeholder="Answer: (Enter A, B, C or D)"></input>

        `;
    }
    aArea.innerHTML = answerInput;


}
