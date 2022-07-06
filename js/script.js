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
let api = 'https://mock-api.driven.com.br/api/v4/shirts-api/shirts'

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
    let modelo = clicou.parentNode.querySelector('p').innerHTML;
    console.log(modelo)
}

//GOLA
function escolherGola(clicou){
    let elemento = document.querySelector('.neck .select')
    
    if(elemento !== null){
        elemento.classList.remove('select')
    }
    clicou.classList.add('select')
    let gola = clicou.parentNode.querySelector('p').innerHTML;
    console.log(gola)
}

//TECIDO
function escolherTecido(clicou){
    let elemento = document.querySelector('.material .select')
    
    if(elemento !== null){
        elemento.classList.remove('select')
    }
    clicou.classList.add('select')
    let tecido = clicou.parentNode.querySelector('p').innerHTML;
    console.log(tecido)
}

//IMAGEM
function armazenarImagem(){
    let imagemEnviar = document.querySelector(".img-ref input").value
    console.log(imagemEnviar)
}

//Confirmar e enviar pedido
function confirmarPedido(){
    let produtos = document.querySelectorAll('.select')
    
    if(produtos.length === 3){
        console.log('sim')
        return
    }
    
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
