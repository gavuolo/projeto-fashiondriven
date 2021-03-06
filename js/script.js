//pegar os itens https://mock-api.driven.com.br/api/v4/shirts-api/shirts
//postar os itens https://mock-api.driven.com.br/api/v4/shirts-api/shirts

let nome
let modelo
let gola
let tecido
let imagem
let imagemEnviar
let objetoEnviar
let arrayDeProdutos
let api = 'https://mock-api.driven.com.br/api/v4/shirts-api/shirts'

registrar()
function registrar(){
    nome = prompt('Qual o seu nome?')
    while(nome === null || nome === ''){
        registrar()
    }
}

//MODELO
function escolherModelo(clicou){
    let elemento = document.querySelector('.model .select')
    
    if(elemento !== null){
        elemento.classList.remove('select')
    }
    clicou.classList.add('select')
    modelo = clicou.parentNode.querySelector('h6').innerHTML
    habilitarBotao()
}

//GOLA
function escolherGola(clicou){
    let elemento = document.querySelector('.neck .select')
    
    if(elemento !== null){
        elemento.classList.remove('select')
    }
    clicou.classList.add('select')
    gola = clicou.parentNode.querySelector('h6').innerHTML;
    habilitarBotao()
}

//TECIDO
function escolherTecido(clicou){
    let elemento = document.querySelector('.material .select')
    
    if(elemento !== null){
        elemento.classList.remove('select')
    }
    clicou.classList.add('select')
    tecido = clicou.parentNode.querySelector('h6').innerHTML;
    habilitarBotao()
}

//IMAGEM
function armazenarImagem(){
    imagem = document.querySelector(".img-ref input").value
    console.log(imagem)
    imagemEnviar = new URL (imagem)
}

//Confirmar e enviar pedido

function habilitarBotao(){
    let produtos = document.querySelectorAll('.select')
    console.log(produtos)
    if(produtos.length === 3){
        let esconder = document.querySelector("div .img-ref > button")
        esconder.classList.add("esconder")

        let aparecer = document.querySelector(".able")
        aparecer.classList.remove("esconder")
    }

}
function confirmarPedido(){
    armazenarImagem()
    if(imagem === ''){
        alert("Não esqueça de colocar a URL da imagem de referência")
    }
    let produtos = document.querySelectorAll('.select')
    if(produtos.length === 3 && imagem != null && imagem != undefined && imagem != ''){
       
        objetoEnviar = {
            model: modelo,
            neck: gola,
            material: tecido,
            image: imagemEnviar,
            owner: nome,
            author: nome
        }
        console.log(objetoEnviar)
        enviarPedido() 
    }
    

    return
}

function enviarPedido(){
    let promessa = axios.post(api, objetoEnviar)

    promessa.then(()=>{
    alert(`
        Obrigade, ${nome}!
        Confirme o pedido:
            - Modelo: ${modelo}.
            - Gola: ${gola}.
            - Tecido: ${tecido}.
        `)
        window.location.reload()
    })
    promessa.catch(()=>{
        alert(`Ops, não conseguimos processar sua encomenda`)
    })

}

//ULTIMOS PEDIDOS ENVIADOS
buscarDados()
function buscarDados(){
    let promessa = axios.get(api);
    //console.log(promessa)
    promessa.then(ultimosPedidos);
    promessa.catch(erroPromessa);   
}

function erroPromessa(){
    console.log('não funcionou')
}

function ultimosPedidos(resposta){
    arrayDeProdutos = resposta.data

    for(let i = 0; i < arrayDeProdutos.length; i++){
        let divAdd = document.querySelector('.all-products')
        divAdd.innerHTML += `
        <div class="last-product" onclick="identificarProduto(this, ${arrayDeProdutos[i].id})">
            <img src="${arrayDeProdutos[i].image}" alt="">
            <h1><strong>Criador:</strong> ${arrayDeProdutos[i].owner}</h1>
        </div>
        `
    }
}

function identificarProduto(div, produtoID){
    console.log(produtoID)
    console.log(arrayDeProdutos[0].id)
    if(window.confirm("Você quer encomendar este produto?")){
        for(let i = 0; i < arrayDeProdutos.length; i++){
            if(produtoID === arrayDeProdutos[i].id){
                objetoEnviar = {
                    model: `${arrayDeProdutos[i].model}`,
                    neck: `${arrayDeProdutos[i].neck}`,
                    material: `${arrayDeProdutos[i].material}`,
                    image: `${arrayDeProdutos[i].image}`,
                    owner: `${arrayDeProdutos[i].owner}`,
                    author: `${arrayDeProdutos[i].owner}`
                }
                console.log(objetoEnviar)
        }
        }
        //POST do produto clicado
        let promessa = axios.post(api, objetoEnviar)
        promessa.then(()=>{
            alert(`Obrigade ${nome}! Volte sempre 🤗`)
            window.location.reload()
        })
        promessa.catch(()=>{
            alert('Foi não')
        })
    }
}