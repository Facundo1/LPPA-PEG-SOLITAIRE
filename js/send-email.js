//Open Email Client
var init = function(){
    var submit = document.getElementById("buttonsubmit");
    submit.onclick = sendEmail;
}
// Function to put the parts of an email with addressee,subject and body
var sendEmail = function(){
    var subj = document.getElementById("name").value;
    var msg = document.getElementById("msg").value;
    window.open('mailto:facundosa123@gmail.com?subject=' + subj + '&body='+msg);
}
window.onload = init;