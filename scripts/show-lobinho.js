//para carregar a página com informações do lobinho

async function buscarLobo(id){
    
}

function carregarHtml(lobo){
    const display = document.querySelector(".title-img-btns-info-box");
    display.querySelector("h2").textContent = lobo.nome;
    display.querySelector("p").textContent = lobo.descricao;
    display.querySelector("img").src = lobo.imagem;
}

async function carregarLobo(id){

}

document.addEventListener("DOMContentLoaded", () => {
    carregarLobo();
});
