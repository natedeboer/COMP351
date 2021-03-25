
let value = 0;


const question1 = "Question ";
const answers = "Answers";
const saveAns = "Save and replace DB";
const addBtn = "Add new Quote";
const deleteBtn = "Delete";
const backBtn = "Back";

function newQuote(quoteId, quote){
    this.quoteId = quoteId;
    this.quote = quote;
}

function duplicate(i) {
    const template = '<div id="duplicate' + i + '">' +	
            '<textarea type="text" id="quote' + i + '" name="quote" class="quote"></textarea><br><br>' +
            '<button type="button" class="button" id="deleter" onclick="deleter(' + i + ')">Delete</button>' +
            '</div>';
            value = i;
    const anotherQ = document.createElement('div');
    anotherQ.innerHTML = template;
    divContainer.appendChild(anotherQ);
}
function duplication() {
    i = value;
    const template = '<div id="duplicate' + i + '">' +	
            '<textarea type="text" id="quote' + i + '" name="quote" class="quote"></textarea><br><br>' +
            '<button type="button" class="button" id="deleter" onclick="deleter(' + i + ')">Delete</button>' +
            '</div>';
            value = i+1;
    const anotherQ = document.createElement('div');
    anotherQ.innerHTML = template;
    divContainer.appendChild(anotherQ);
}

function deleter(i) {
        let holder = [];
        k=1;
        for(j = 1; j < value; j++){
            if(j !=i){
                holder[k] = document.getElementById('quote' + j).value;
                k++;
            }
        }
        for(l=1; l < value; l++){
            document.getElementById('duplicate' + l).remove();
        }
        for(p = 1; p < holder.length; p++){
            duplicate(p);
            document.getElementById("quote" + p).value = holder[p];
        }
        value = p;
}

function saver() {
        let quotes = [];
        let j = 1;
        for (j; j < value; j++){
            let quote = new newQuote(j,document.getElementById("quote" + j).value);
            quotes.push(quote);
        }
        let jsonQuotes = JSON.stringify(quotes);
        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://crazymuppets.com/COMP351/labs/indiv_project/saveQuiz", true);
        xhttp.send(jsonQuotes);
    }

window.onload = function load(){
    //create button text from string instead of hard coded. Cannot use let since variables are already declared.
    var t = document.createTextNode(addBtn);
    var b = document.getElementById("adder");
    b.appendChild(t);
    var t = document.createTextNode(saveAns);
    var b = document.getElementById("saver");
    b.appendChild(t);
    var t = document.createTextNode(backBtn);
    var b = document.getElementById("backButton");
    b.appendChild(t);
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
                value++;
            }
        }
    }
}