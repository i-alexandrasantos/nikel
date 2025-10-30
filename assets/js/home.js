const modal = new bootstrap.Modal("#modalLancamento");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
let data = {transactions: []};

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

    //console.log(data);
    getEntradas();
    getSaidas();
    getTotal();
}

//Logout da Conta
document.getElementById("btnLogout").addEventListener("click",logout);

//Botão Ver Todas
document.getElementById("btnVerTodas").addEventListener("click", function(){
    window.location.href = "transactions.html";
});


function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
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

    getEntradas();
    getSaidas();
    getTotal();
    alert("Lançamento efetuado com sucesso!");

});

//Salva os itens lançados
function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

//Retorna todas as entradas
function getEntradas(){
    const transactions = data.transactions;

    const entradas = transactions.filter((item) => item.type === "1");

    //console.log(entradas)
    if(entradas.length){
        let entradasHtml = "";
        let limit = 0;

        //Mostra 5 ou o que tem cadastrado
        if(entradas.length > 5){
            limit = 5
        } else{
            limit = entradas.length;
        }

        for (let index = 0; index < limit; index++) {
             entradasHtml += `
             <div class="mt-3 mb-3">
                <div class="row">
                  <div class="col-12 col-sm-12">
                    <h3>${entradas[index].value.toFixed(2)}</h3>
                  </div>
                </div> 

                <div class="row">
                  <div class="col-12 col-sm-8">
                    <p class="mb-1">${entradas[index].description}</p>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="d-flex justify-content-md-end">
                      ${entradas[index].date}
                    </div>
                  </div>
                </div> 
              </div>
            `
        }

        document.getElementById("entradaList").innerHTML = entradasHtml;
    }
}

//Retorna todas as saídas
function getSaidas(){
    const transactions = data.transactions;

    const saidas = transactions.filter((item) => item.type === "2");

    if(saidas.length){
        let saidasHtml = "";
        let limit = 0;

        //Mostra 5 ou o que tem cadastrado
        if(saidas.length > 5){
            limit = 5
        } else{
            limit = saidas.length;
        }

        for (let index = 0; index < limit; index++) {
             saidasHtml += `
             <div class="mt-3 mb-3">
                <div class="row">
                  <div class="col-12 col-sm-12">
                    <h3>${saidas[index].value.toFixed(2)}</h3>
                  </div>
                </div> 

                <div class="row">
                  <div class="col-12 col-sm-8">
                    <p class="mb-1">${saidas[index].description}</p>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="d-flex justify-content-md-end">
                      ${saidas[index].date}
                    </div>
                  </div>
                </div> 
              </div> 
            `
        }

        document.getElementById("saidaList").innerHTML = saidasHtml;
    }
}

//Retorna o Total
function getTotal(){
    const transactions = data.transactions;
    let total = 0;

    transactions.forEach((item) =>{
        if(item.type === "1"){
            total += item.value;
        } else {
            total -= item.value;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}