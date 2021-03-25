
let value = 0;
const backBtn = "Back";

function duplicate(i) {
    const template = '<div id="duplicate' + i + '">' +	
            '<textarea type="text" id="quote' + i + '" name="quote" class="quote"></textarea><br><br>' +	
            '</div>';
            value = i;
    const anotherQ = document.createElement('div');
    anotherQ.innerHTML = template;
    divContainer.appendChild(anotherQ);
}

function showAll() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://crazymuppets.com/COMP351/labs/indiv_project/getQuiz", true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            quote = JSON.parse(this.responseText);
            quote.sort(function(a,b){
                return (a.quoteId - b.quoteId);
            });
            for(k = 0; k < quote.length; k++){
                duplicate(quote[k].quoteId);
                document.getElementById("quote" + quote[k].quoteId).value = quote[k].quote;
            }
        }
    }
}
function showRecent() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://crazymuppets.com/COMP351/labs/indiv_project/getOne", true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            quote = JSON.parse(this.responseText);
            quote.sort(function(a,b){
                return (a.quoteId - b.quoteId);
            });
            let k = quote.length-1;
                duplicate(quote[k].quoteId);
                document.getElementById("quote" + quote[k].quoteId).value = quote[k].quote;
        }
    }
}

window.onload = function load(){
    //create button text from string instead of hard coded. Cannot use let since variables are already declared.
    var t = document.createTextNode(backBtn);
    var b = document.getElementById("backButton");
    b.appendChild(t);
}