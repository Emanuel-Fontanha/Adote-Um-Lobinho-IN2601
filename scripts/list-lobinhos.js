import { buscarLobinhos_porNome } from "./api.js"

async function carregarLobinhos(name="") {
    try {
        const lobinhos = await buscarLobinhos_porNome(name);
        return lobinhos
    } catch(error) {
        console.error("Erro ao carregar lobinhos:", error)
    }
}

function atualizarLayout(lobinhos) {
    
    const lobosSection = document.querySelector(".view-wolves-section")
    lobosSection.innerHTML = ""

    lobinhos.forEach((lobinho, index) => {
        const div = document.createElement("div")
        div.innerHTML = `
            <div class="wolf-container${index % 2 == 0 ? "-1" : "-2"}">
    
                <img
                    src="${lobinho.imagem}"
                    alt="${lobinho.nome}"
                    class="wolf-pic">
                <div class="wolf-info">
    
                    <div class="wolf-details${index % 2 == 0 ? "-1" : "-2"}">
                        <div class="wolf-name-age${index % 2 == 0 ? "-1" : "-2"}">
                            <h2 class="wolf-name">${lobinho.nome}</h2>
                            <p class="wolf-age">Idade: ${lobinho.idade} anos</p>
                        </div>
                        <a
                            class="adopt-wolf-btn ${lobinho.adotado ? "adopted" : ""}"
                            href="../pages/show-lobinho.html?id=${lobinho.id}"
                            >${lobinho.adotado ? "Adotado" : "Adotar"}</a>
                    </div>
    
                    <p
                        class="wolf-text${index % 2 == 0 ? "-1" : "-2"}"
                        >${lobinho.descricao}</p>
                </div>
            </div>
        `
        lobosSection.appendChild(div)
    })
}

function filtrarLobinhos (lobinhos, shouldFilter) {
    if (shouldFilter) {
        lobinhos = lobinhos.filter(lobo => lobo.adotado == true)
    }
    atualizarLayout(lobinhos)
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        let lobinhos = await buscarLobinhos_porNome("");
        atualizarLayout(lobinhos);
    } catch (err) {
        console.error("Erro ao carregar:", err);
    }
});

let searchBar = document.querySelector("#wolf-filter");
document.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        let nameFilter = searchBar.value;
        const lobinhos = await carregarLobinhos(nameFilter);
        atualizarLayout(lobinhos);
    }      
})

const checkboxAdopted = document.querySelector("#adopt-checkbox")
checkboxAdopted.addEventListener("change", async () => {
    const shouldFilter = (shouldFilter ? false : true)
    const lobinhos = await carregarLobinhos()
    filtrarLobinhos(lobinhos, shouldFilter)
})