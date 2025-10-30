const modal = new bootstrap.Modal("#modalCriarConta");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");

checkIfLogged();

//Criação de Conta
document.getElementById("formCreateAccount").addEventListener("submit", function(e){
    e.preventDefault();

   //Salva os dados
   const email = document.getElementById("emailCreateInput").value;
   const password = document.getElementById("passwordCreateInput").value;

   console.log(email);
   //console.log(email,password)

   //Verifica o e-mail
   if(email.length < 5){
        alert('Insira um e-mail válido');
        return
   }

   //Verifica a senha
   if(password.length < 4){
        alert('Insira uma senha com no mínimo 4 caracteres.');
        return
   }

   saveData({
    //objeto
    login: email,
    password: password,
    transactions: []
   })

   //Esconde o Modal
   modal.hide();
   alert('Conta criada com sucesso!');
    
})

function saveData(dados){
   // console.log(dados)
   localStorage.setItem(dados.login, JSON.stringify(dados))
}

//Login
document.getElementById("formLogin").addEventListener("submit", function(e){
    e.preventDefault();
    //alert('deu certo');

    //Salva os dados
    const email = document.getElementById("loginInput").value;
    const password = document.getElementById("passwordInput").value;
    const checkSession = document.getElementById("sessionCheck").checked;

    //Recupera o Email
    const account = getAccount(email);

    if(!account){
        alert("Erro! Verifique o e-mail ou senha inserida.");
        return;
    }

    if(account){
        if(account.password !== password){
            alert("Erro! Verifique o e-mail ou senha inserida.");
            return;
        }

        saveSession(email,checkSession);

        window.location = "home.html";
    }


})

//Salva os dados no LocalStorage
function getAccount(key){
    const account = localStorage.getItem(key);

    if(key){
        return JSON.parse(account);
    }

    return "";
}

//Verifica se está logado e salva na session
function checkIfLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

//Mantém o usuário logado
function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logged", data)
}