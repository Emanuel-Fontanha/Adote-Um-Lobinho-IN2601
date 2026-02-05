async function buscarLobinhos() {
    try {

        const response = await fetch('http://localhost:3000/lobinhos?_limit=4')
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const lobinhos = await response.json()
        return lobinhos

    } catch(error) {
        console.error("Erro ao buscar lobinhos:", error)
        throw error
    }
}

async function carregarLobinhos() {
    try {
        const lobinhos = await buscarLobinhos()
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
                        <div class="wolf-name-age">
                            <h2 class="wolf-name">${lobinho.nome}</h2>
                            <p class="wolf-age">Idade: ${lobinho.idade} anos</p>
                        </div>
                        <a
                            class="adopt-wolf-btn ${lobinho.adotado ? "adopted" : ""}"
                            href="../pages/show-lobinho.html"
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
    const lobinhos = await carregarLobinhos()
    atualizarLayout(lobinhos)
})
