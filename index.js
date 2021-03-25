const userPage = "User";
const adminPage = "Admin";
const lab = "Lab 2";



window.onload = function load(){
    //create button text from string instead of hard coded. Cannot use let since variables are already declared.
    var t = document.createTextNode(userPage);
    var b = document.getElementById("user");
    b.appendChild(t);
    var t = document.createTextNode(adminPage);
    var b = document.getElementById("admin");
    b.appendChild(t);
    var t = document.createTextNode(lab);
    var b = document.getElementById("title");
    b.appendChild(t);
}