const psw = document.getElementById('psw');

psw.addEventListener('keyup', ()=>{
    const note = document.querySelector('.strength-note');
    const strength = document.getElementById('strength');
    pswValue = psw.value.trim();
    // alert('hello');
    if(pswValue === ''){
        strength.style.width = '0%';
        strength.style.background = 'red';
        note.innerHTML = '';
       
    }
     if(pswValue.match(/[a-z]+/)){
        strength.style.width = '5%';
        strength.style.background = 'red';
        note.style.opacity = '1';
        note.innerHTML = 'very weak password';
        
        
       
    }
     if(pswValue.length > 5 ){
        strength.style.width = '10%';
        strength.style.background = 'red';
        note.innerHTML = 'very weak password';
    }
    if(pswValue.match(/[a-z]+/) && pswValue.length > 5 && pswValue.match(/[A-Z]+/)){
        strength.style.width = '20%';
        strength.style.background = 'red';
        note.innerHTML = 'weak password';
       
    }
    if(pswValue.match(/[a-z]+/) && pswValue.length > 5 && pswValue.match(/[A-Z]+/) && pswValue.match(/[0-9]+/)){
        strength.style.width = '60%';
        strength.style.background = 'yellow';
        note.innerHTML = 'strong password';
       
    }
   if(pswValue.match(/[a-z]+/) && pswValue.length > 5 && pswValue.match(/[A-Z]+/) && pswValue.match(/[0-9]+/) && pswValue.match(/[?><!@#$%^&*)(*+-/=}{_]+/)){
        strength.style.width = '100%';
        strength.style.background = '#7bff00';
        note.innerHTML = 'very strong password';
       
    }

});
const viewpass = document.querySelector('.viewpass');
viewpass.addEventListener('click', ()=>{
    if(psw.type === "password"){
        psw.type = "text";
        viewpass.style.background = 'none';
    viewpass.style.border = '1px solid #fff';
    }else{
        psw.type = "password";
        viewpass.style.background = 'white';
    viewpass.style.border = 'none';
    }
    
})
