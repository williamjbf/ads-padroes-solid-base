function openModal(mn) {
    let modal = document.getElementById(mn);
    if (typeof modal == 'undefined' || modal === null)
        return;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function closeModal(mn) {
    let modal = document.getElementById(mn);
    if (typeof modal == 'undefined' || modal === null)
        return;
    modal.style.display = 'none';

}
let nome = document.getElementById('nome');
let nameValidation = document.getElementById('name-validation');
nome.onkeyup = function(){
if(nome.value.length < 3){
    nameValidation.innerText = 'Por favor, preencha o campo nome';
    nome.style.border = '';
    }
    else{
        nameValidation.innerText = ''; 
    }
}
let email = document.getElementById('email');
let mailValidation = document.getElementById('mail-validation');
email.onkeyup = function(){

    const regexmail =/\S+@\S+\.\S+/;
    if(regexmail.test(email.value)){
        mailValidation.innerText = 'Seu email é válido';
        mailValidation.style.color = 'lime';
        
    }
    else{
        mailValidation.innerText = 'Seu email não válido';
        mailValidation.style.color = 'red';
    }


}