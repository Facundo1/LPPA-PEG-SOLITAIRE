//Open Email Client
var init = function(){
    var Submit = document.getElementById("buttonsubmit");
    Submit.onclick = SendEmail;
}

var SendEmail = function(){
    var Subj = document.getElementById("name").value;
    var msg = document.getElementById("msg").value;
    window.open('mailto:facundosa123@gmail.com?subject='+Subj+'&body='+msg);
}
window.onload = init;