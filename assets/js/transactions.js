const modal = new bootstrap.Modal("#modalLancamento");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
let data = {transactions: []};

//Logout da Conta
document.getElementById("btnLogout").addEventListener("click",logout);

function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

checkIfLogged();

//Verifica se está logado e salva na session
function checkIfLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged){
        window.location.href = "index.html";
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser){
        data = JSON.parse(dataUser);
    }

    getTransactions();
}

//Adiciona Lançamento
document.getElementById("formLancamento").addEventListener("submit", function(e){
    e.preventDefault();

    const value = parseFloat(document.getElementById("valueInput").value);
    const description = document.getElementById("descriptionInput").value;
    const date = document.getElementById("dateInput").value;
    const type = document.querySelector('input[name="typeInput"]:checked').value;

    //listar os itens, o último será sempre o primeiro
    data.transactions.unshift({
        value: value,
        type: type,
        description: description,
        date: date
    });

    //chama a função de salvar
    saveData(data);
    e.target.reset();//Limpa os dados do form
    modal.hide();

    getTransactions();

    alert("Lançamento efetuado com sucesso!");

});

//Salva os itens lançados
function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

//Lista todos os lançamentos
function getTransactions(){
    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length){
        transactions.forEach((item) =>{
            let type = "Entrada";

            if(item.type === "2"){
                type = "Saída";
            }

            transactionsHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
            `
        })
    }

    document.getElementById("transactionList").innerHTML = transactionsHtml;

     console.log(transactions)
}