var btt = document.getElementById("back-top"),
    body = document.body,
    docElem = document.documentElement,
    offset = 100,
    scrollpos, docHeight;

docHeight = Math.max(body.scrollHeight, body.offsetHeight, docElem.clientHeight, docElem.scrollHeight, docElem.offsetHeight);
if ( docHeight != 'undefined' ){
    offset = docHeight / 4;
}

window.addEventListener("scroll",function(event){
    scrollpos = body.scrollTop || docElem.scrollTop;
    btt.className = (scrollpos > offset) ? "visible" : "";
})


var targetInput = document.getElementById( "country" ),
    results = document.getElementById("autocomplete-results"),
    countryList = ['Durgapur', 'Kolkata', 'Dehradun', 'Masoori', 'Delhi', 'Mumbai', 'Bnaglore', 'Hydrabad'],
    matches = [];

targetInput.focus();

// targetInput.addEventListener("keydown", function(event){
//     if(event.keyCode=="13"){
//         event.preventDefault();
//     }
// })

targetInput.addEventListener("keyup", function(event) {


    results.innerHTML = "";
    toogleResults("hide");
    if(this.value.length >0){
        matches = getMatches(this.value);

        if(this.matches.length>0){
            displayMatches(matches);
        }
    }

    if(results.classList.contains("visible")){
        switch(event.keyCode){
            case 13:
                targetInput.value = results.children[resultsCursor].innerHTML;
                toogleResults("hide");
                resultsCursor = 0;
                break;
            case 38:
                if(resultsCursor>0){
                    resultsCursor--;
                    moveCursor(resultsCursor);
                }
                break;
            case 40:
                if(resultsCursor < (matches.length - 1)){
                    resultsCursor++;
                    moveCursor(resultsCursor);
                }
                break;
        }
    }
});



function toogleResults (action){
    if(action=="show") {
        results.classList.add("visible");
    }
    else if (action == "hide"){
        results.classList.remove("visible");
    }
}

function getMatches(inputText){
    var matchList = [];

    for(var i = 0; i < countryList.length;i++){
        if(countryList[i].toLowerCase().indexOf(inputText.toLowerCase())!=-1){
            matchList.push(countryList[i]);
        }
    }
    return matchList;
}

function displayMatches(matchList){
    var j = 0;

    while(j<matchList.length){
        results.innerHTML += '<li class="result">' + matchList[j] + '</li>';
        j++;
    }

    toogleResults("show");

}