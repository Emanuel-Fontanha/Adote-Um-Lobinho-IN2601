import { buscarLobinhos } from "./api.js"

async function carregarLobinhos() {

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



document.addEventListener("DOMContentLoaded", async () => {
    try {
        const lobinhos = await buscarLobinhos();
        atualizarLayout(lobinhos);
    } catch (error) {
        console.error("Erro ao carregar:", error);
    }
});

const searchBar = document.querySelector("#wolf-filter");
document.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        let nameFilter = searchBar.value;
        const lobinhos = await carregarLobinhos(nameFilter);
        atualizarLayout(lobinhos);
    }
})