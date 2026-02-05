//Exemplo de DELETE para a API (JSON Server)
//DELETE remove um recurso completamente 
const { buscarLobinhos } = require("./home-page");

async function deletarLobinho(id) {
    try {
        const response = await fetch(`http://localhost:3000/lobinhos/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP! Status ${response.status}`);
        }

        console.log(`Lobinho com id ${id} foi deletado com sucesso`);
        return true;
    } catch (error) {
        console.error('Erro ao deletar lobinho:', error);
        throw error;
    }
}

let del_btn = document.querySelector("#del-btn");
del_btn.addEventListener("click", deletarLobinho(`${id}`));






