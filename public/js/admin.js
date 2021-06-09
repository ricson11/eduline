var tim = document.getElementById('tim');
var tim1 = document.getElementById('tim1');
var tim2 = document.getElementById('tim2');

var notebox = document.getElementById('notebox');
var notebox1 = document.getElementById('notebox1');
var notebox2 = document.getElementById('notebox2');

var newsi = document.getElementById('newsi');
var userNote = document.getElementById('userNote');
var bellNote = document.getElementById('bellNote');
var emailNote = document.getElementById('emailNote');


userNote.addEventListener('click', function(){
    notebox.style.display='block';
    notebox2.style.display='none';


});



emailNote.addEventListener('click', function(){
    notebox2.style.display='block';
    notebox.style.display='none';
    

});

tim.addEventListener('click', function(){
    notebox.style.display='none';

});



tim2.addEventListener('click', function(){
    notebox2.style.display='none';

});