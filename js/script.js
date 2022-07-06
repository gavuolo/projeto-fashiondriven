//pegar os itens https://mock-api.driven.com.br/api/v4/shirts-api/shirts
//postar os itens https://mock-api.driven.com.br/api/v4/shirts-api/shirts
/*		"id": 2445,
		"model": "top-tank",
		"neck": "round",
		"material": "silk",
		"owner": "jajajaja",
		"image": "https://http.cat/411.jpg"
*/

let nome
let modelo
let gola
let tecido
let imagem
let imagemEnviar
let objetoEnviar
let api = 'https://mock-api.driven.com.br/api/v4/shirts-api/shirts'

registrar()
function registrar(){
    nome = prompt('Qual o seu nome?')
    while(nome === null){
        nome = prompt('Qual o seu nome?')
    }
}

//MODELO
function escolherModelo(clicou){
    let elemento = document.querySelector('.model .select')
    
    if(elemento !== null){
        elemento.classList.remove('select')
    }
    clicou.classList.add('select')
    modelo = clicou.parentNode.querySelector('p').innerHTML;
    console.log(modelo)
}

//GOLA
function escolherGola(clicou){
    let elemento = document.querySelector('.neck .select')
    
    if(elemento !== null){
        elemento.classList.remove('select')
    }
    clicou.classList.add('select')
    gola = clicou.parentNode.querySelector('p').innerHTML;
    console.log(gola)
}

//TECIDO
function escolherTecido(clicou){
    let elemento = document.querySelector('.material .select')
    
    if(elemento !== null){
        elemento.classList.remove('select')
    }
    clicou.classList.add('select')
    tecido = clicou.parentNode.querySelector('p').innerHTML;
    console.log(tecido)
}

//IMAGEM

function armazenarImagem(){
    imagem = document.querySelector(".img-ref input").value
    if(imagem === null || imagem === undefined || imagem === ''){
        alert("Insira um link de imagem")
    }
    //imagemEnviar = new URL (imagem)
}

//Confirmar e enviar pedido
function confirmarPedido(){
    let produtos = document.querySelectorAll('.select')
    armazenarImagem()
    if(produtos.length === 3){

        objetoEnviar = {
            "model": modelo,
            "neck": gola,
            "material": tecido,
            "owner": nome,
            "image": imagemEnviar,
        }
        console.log('tudo ok')
        enviarPedido() 
        return 
    }
}

function enviarPedido(){
    let promessa = axios.post(api, objetoEnviar)

    promessa.then(()=>{
    alert(`
        Obrigada, ${nome}!
        Confirme o pedido:
            - Modelo: ${modelo}.
            - Gola: ${gola}.
            - Tecido: ${tecido}.
        `)})
    promessa.catch(()=>{
        alert(`Ops, não conseguimos processar sua encomenda`)
    })

}



//ULTIMOS PEDIDOS ENVIADOS
function buscarDados(){
    let promessa = axios.get(api);
    console.log(promessa)

    promessa.then(ultimosPedidos);
    promessa.catch(erroPromessa);   
}

function erroPromessa(){
    console.log('não funcionou')
}

function ultimosPedidos(resposta){
    console.log(resposta)
    console.log(resposta.data)

}
