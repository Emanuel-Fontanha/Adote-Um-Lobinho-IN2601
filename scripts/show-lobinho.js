//para carregar a página com informações do lobinho

async function buscarLobo(id){
    
}

function carregarHtml(lobo1){
    const display = document.querySelector(".title-img-btns-info-box");
    display.querySelector("h2").textContent = lobo1.nome;
    display.querySelector("p").textContent = lobo1.descricao;
    display.querySelector("img").src = lobo1.imagem;
}

async function carregarLobo(id){
    
}

document.addEventListener("DOMContentLoaded", () => {
    carregarLobo();
});
