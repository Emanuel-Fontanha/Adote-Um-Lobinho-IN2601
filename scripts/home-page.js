// Função assíncrona para buscar todos os lobinhos:

async function buscarLobinhos() {
    try {
        const response = await fetch('http://localhost:3000/lobinhos', {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const lobinhos = await response.json();
        console.log('Lobinhos encontrados:', lobinhos);

        return lobinhos;
    } catch (error) {
        console.error('Erro ao buscar lobinhos:', error);
        throw error;
    }
}

function sortearDois(lobos) {
    const indicePrimeiroLobo = Math.floor(Math.random() * lobos.length);
    let indiceSegundoLobo = Math.floor(Math.random() * lobos.length);

    while (indicePrimeiroLobo === indiceSegundoLobo) {
        indiceSegundoLobo = Math.floor(Math.random() * lobos.length);
    }

    return [lobos[indicePrimeiroLobo], lobos[indiceSegundoLobo]];
}

function atualizarHTML(lobo1, lobo2) {

    const box1 = document.querySelector(".img-name-infos-box-1");
    box1.querySelector("h4").textContent = lobo1.nome;
    box1.querySelector("h5").textContent = `Idade: ${lobo1.idade} anos`;
    box1.querySelector("p").textContent = lobo1.descricao;
    box1.querySelector("img").src = lobo1.imagem;

    const box2 = document.querySelector(".img-name-infos-box-2");
    box2.querySelector("h4").textContent = lobo2.nome;
    box2.querySelector("h5").textContent = `Idade: ${lobo2.idade} anos`;
    box2.querySelector("p").textContent = lobo2.descricao;
    box2.querySelector("img").src = lobo2.imagem;
}

async function carregarDoisLobos() {
    try {
        const lobinhos = await buscarLobinhos();

        if (lobinhos.length < 2) return;

        const [lobo1, lobo2] = sortearDois(lobinhos);

        atualizarHTML(lobo1, lobo2);

    } catch (error) {
        console.error("Erro ao carregar lobos:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarDoisLobos();
});
