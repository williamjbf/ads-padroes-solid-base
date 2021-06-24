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
let operacao = 'A';
let usuarios;

if (localStorage.getItem('usuarios')) {
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
}
else {
    usuarios = [];
}

let indice_selecionado = -1;
const frmCadastro = document.getElementById('frmCadastro');

function add() {
    if (operacao == 'A') {
        return Adicionar();
    }
    else {
        return Editar();

    }

}

function Adicionar() {
    let usuario = {
        nome: document.querySelector('#txtNome').value,
        email: document.querySelector('#txtEmail').value
    }
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    return true;
}

function handleEditar(e) {
    operacao = "E";
    indice_selecionado = parseInt(e.getAttribute("alt"));
    let users = JSON.parse(localStorage.getItem('usuarios'));
    let user = users[indice_selecionado];

    document.querySelector("#txtNome").value = user.nome;
    document.querySelector("#txtEmail").value = user.email;
    let modal = document.getElementById('cadastrados-modal');
    if (typeof modal == 'undefined' || modal === null)
        return;
    modal.style.display = 'none';

}

function Editar() {
    let users = JSON.parse(localStorage.getItem('usuarios'));

    const userAtualizado = {
        nome: document.querySelector("#txtNome").value,
        email: document.querySelector("#txtEmail").value
    }

    users[indice_selecionado] = userAtualizado;
    localStorage.setItem('usuarios', JSON.stringify(users));
    alert('Usuario atualizado');
    operacao = 'A';
    closeModal('cadastrados-modal');

}


function listar() {
    let tbody = document.querySelector('#tblListar tbody');
    let linhas = '';
    let users = JSON.parse(localStorage.getItem('usuarios'));

    for (let i in users) {
        let user = users[i];
        linhas += `<tr>
                <td class="icons">
                    <img class="img-m" src='../imagens/editar.png' alt ='${i}' onclick='handleEditar(this)'/>
                    <img class="img-m" src='../imagens/deletar.png' alt ='${i}' onclick='handleDeletar(this)'/>
                </td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
              </tr>`

    }
    tbody.innerHTML = linhas;

}
document.querySelector('#modal-cadastrados').addEventListener('click', function (e) {
    listar();
})

function deletar(indice) {
    usuarios.splice(indice, 1);
    if (usuarios.length == 0) {
        localStorage.removeItem('usuarios');
        return;
    }
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function handleDeletar(e) {
    let indice_selecionado = parseInt(e.getAttribute("alt"));
    deletar(indice_selecionado);
    listar();
}

function sorteio() {
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
    let max = usuarios.length
    let resultado = [];
    let num = 0;
    for (let i = 0; i < usuarios.length; i++) {
        num = Math.floor((Math.random() * max) + 0);
        if (resultado.includes(num)) {
            i--;
        }
        else {
            resultado.push(num);
        }
    }
    alert(resultado)
}
document.querySelector('#btnSortear').addEventListener('click', function (e) {
    sorteio()
})

//CÓDIGO DE VALIDATIONS DA PAGE DE CADASTRO;
let nome = document.getElementById('txtNome');
let nameValidation = document.getElementById('name-validation');
nome.onkeyup = function () {
    var nameVal = true;
    if (nome.value.length < 3) {
        nameValidation.innerText = 'Por favor, preencha o campo nome';
        nome.style.border = '';
    }
    else {
        nameValidation.innerText = '';
        nameVal = false;
    }
}
let email = document.getElementById('txtEmail');
let mailValidation = document.getElementById('mail-validation');email.onkeyup = function () {
    const regexmail = /\S+@\S+\.\S+/;
    if (regexmail.test(email.value)) {
        mailValidation.innerText = 'Seu email é válido';
        mailValidation.style.color = 'lime';

    }
    else {
        mailValidation.innerText = 'Seu email não válido';
        mailValidation.style.color = 'red';

    }
}
