import { handleLobinhos } from "./api.js"


function atualizarLayout(dados) {

    const { lobos, pagina, totalItens, totalPaginas } = dados
    
    const lobosSection = document.querySelector(".view-wolves-section")
    lobosSection.innerHTML = ""

    lobos.forEach((lobinho, index) => {
        const div = document.createElement("div")
        div.innerHTML = `
            <div class="wolf-container${index % 2 == 0 ? "-1" : "-2"}">
    
                <img
                    src="${lobinho.imagem}"
                    alt="${lobinho.nome}"
                    class="wolf-pic">
                <div class="wolf-info">
    
                    <div class="wolf-details${index % 2 === 0 ? "-1" : "-2"}">
                        <div class="wolf-name-age${index % 2 === 0 ? "-1" : "-2"}">
                            <h2 class="wolf-name">${lobinho.nome}</h2>
                            <p class="wolf-age">Idade: ${lobinho.idade} anos</p>
                        </div>
                        <a
                            class="adopt-wolf-btn ${lobinho.adotado ? "adopted" : ""}"
                            href="../pages/show-lobinho.html?id=${lobinho.id}"
                            >${lobinho.adotado ? "Adotado" : "Adotar"}</a>
                    </div>
    
                    <p
                        class="wolf-text${index % 2 === 0 ? "-1" : "-2"}"
                        >${lobinho.descricao}</p>
                </div>
            </div>
        `
        lobosSection.appendChild(div)
    })
}


function returnTextFromFilter() {
    const name = document.getElementById("wolf-filter").value
    return name.length > 0 ? name : ""
}


document.addEventListener("DOMContentLoaded", async () => {
    try {
        const dados = await handleLobinhos();
        atualizarLayout(dados);
    } catch (error) {
        console.error("Erro ao carregar:", error);
    }
});

let isFiltering = false
const box = document.getElementById("adopt-checkbox")
box.addEventListener("change", async () => {
    try {
    
        const nomeLobo = returnTextFromFilter()
        isFiltering = isFiltering ? false : true
        const dados = await handleLobinhos({ nome : nomeLobo, adotado : box.checked });
        atualizarLayout(dados);

    } catch (error) {
        console.error("Erro ao carregar:", error);
    }
})

document.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        try {
            
            const nomeLobo = returnTextFromFilter()
            const dados = await handleLobinhos({ nome : nomeLobo, adotado : box.checked });
            atualizarLayout(dados);

        } catch (error) {
            console.error("Erro ao carregar:", error);
        }
    }
})

