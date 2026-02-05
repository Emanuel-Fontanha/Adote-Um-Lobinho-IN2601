const params = new URLSearchParams(window.location.search);
export const id = params.get("id");

console.log(window.location);
console.log(window.location.search);
console.log(id);

async function buscarLobo(id){
    try {
        const response = await fetch(`http://localhost:3000/lobinhos/${id}`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const lobo = await response.json();
        console.log('Lobo encontrado:', lobo);

        return lobo;
    } catch (error) {
        console.error('Erro ao buscar lobinhos:', error);
        throw error;
    }
}

function carregarHtml(lobo){
    const display = document.querySelector(".title-img-btns-info-box");
    display.querySelector("h2").textContent = lobo.nome;
    display.querySelector("p").textContent = lobo.descricao;
    display.querySelector("img").src = lobo.imagem;
}

async function carregarLobo(id){
    try {
        const lobo = await buscarLobo(id);

        if (!id) {
            console.error("ID não informado na URL");
            return;
        }

        carregarHtml(lobo);

    } catch (error) {
        console.error("Erro ao carregar lobo:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarLobo(id);
});


