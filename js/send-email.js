//Open Email Client
var init = function(){
    var Submit = document.getElementById("ButtonSubmit");
    Submit.onclick = SendEmail;
}

var SendEmail = function(){
    var Subj = document.getElementById("name").value;
    var msg = document.getElementById("msg").value;
    console.log(Subj,msg);
    window.open('mailto:facundosa123@gmail.com?subject='+Subj+'&body='+msg);
}
window.onload = init;