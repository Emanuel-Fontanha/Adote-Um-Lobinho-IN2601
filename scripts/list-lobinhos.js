import { handleLobinhos } from "./api.js"


function atualizarLayout(lobos) {
    
    const lobosSection = document.querySelector(".view-wolves-section")
    lobosSection.innerHTML = ""

    lobos.forEach((lobinho, index) => {
        const div = document.createElement("div")
        div.innerHTML = `
            <div class="wolf-container${index % 2 == 0 ? "-1" : "-2"}">
    
                <div class="wolf-pic${index % 2 == 0 ? "-1" : "-2"}">
                    <img src="${lobinho.imagem}" alt="${lobinho.nome}">
                </div>

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


async function mudarPagina(novaPagina) {
    const nomeLobo = returnTextFromFilter()
    const box = document.getElementById("adopt-checkbox")
    const dados = await handleLobinhos({
        nome: nomeLobo,
        pagina: novaPagina,
        adotado: box.checked
    })

    atualizarLayout(dados.lobos)
    montarPaginacao(dados.pagina, dados.totalPaginas)
}


function criarPontinhosPaginacao (box) {

    // Caso não apareça a primeira ou a última página entre as 5 visíveis, cria os "..."

    const hiddenPages = document.createElement("span")
    hiddenPages.textContent = "..."
    hiddenPages.classList.add("page-btn", "inactive")
    box.appendChild(hiddenPages)
}


function montarPaginacao(pagina, totalPaginas) {
    const box = document.querySelector(".pagination-div")
    box.innerHTML = ""

    let start = Math.max(1, pagina - 2)
    let end = start + 4

    if (end > totalPaginas) {
        end = totalPaginas
        start = Math.max(1, end - 4)
    }

    // Criando o botão << inicial
    const arrowBtnStart = document.createElement("button")
    arrowBtnStart.textContent = "<<"
    arrowBtnStart.onclick = () => mudarPagina(1)
    arrowBtnStart.classList.add("page-btn")
    box.appendChild(arrowBtnStart)

    if (start > 1) criarPontinhosPaginacao(box)

    // Definindo as páginas visíveis
    for (let i = start; i <= end; i++) {
        const pageBtn = document.createElement("button")
        pageBtn.textContent = i
        pageBtn.classList.add("page-btn")

        if (i === pagina) {
            pageBtn.classList.add("current-page")
        }

        pageBtn.onclick = () => {mudarPagina(i)}
        box.appendChild(pageBtn)
    }

    if (end < totalPaginas) criarPontinhosPaginacao(box)

    // Criando o botão >> final
    const arrowBtnEnd = document.createElement("button")
    arrowBtnEnd.textContent = ">>"
    arrowBtnEnd.onclick = () => mudarPagina(totalPaginas)
    arrowBtnEnd.classList.add("page-btn")
    box.appendChild(arrowBtnEnd)
}


function returnTextFromFilter() {
    const name = document.getElementById("wolf-filter").value
    return name.length > 0 ? name : ""
}



document.addEventListener("DOMContentLoaded", async () => {
    try {
        const dados = await handleLobinhos()
        atualizarLayout(dados.lobos)
        montarPaginacao(dados.pagina, dados.totalPaginas)
    } catch (error) {
        console.error("Erro ao carregar:", error)
    }
});

let isFiltering = false
const box = document.getElementById("adopt-checkbox")
box.addEventListener("change", async () => {
    try {
    
        const nomeLobo = returnTextFromFilter()
        isFiltering = isFiltering ? false : true
        const dados = await handleLobinhos({ nome : nomeLobo, adotado : box.checked })
        atualizarLayout(dados.lobos)
        montarPaginacao(dados.pagina, dados.totalPaginas)

    } catch (error) {
        console.error("Erro ao carregar:", error)
    }
})

document.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
        try {
            
            const nomeLobo = returnTextFromFilter()
            const dados = await handleLobinhos({ nome : nomeLobo, adotado : box.checked })
            atualizarLayout(dados.lobos)
            montarPaginacao(dados.pagina, dados.totalPaginas)

        } catch (error) {
            console.error("Erro ao carregar:", error)
        }
    }
})

