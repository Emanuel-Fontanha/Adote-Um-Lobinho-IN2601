// Função principal para LIDAR COM OS FILTROS da requisição GET
export async function handleLobinhos ({ nome = "", pagina = 1, limite = 4, adotado = false } = {}) {
    try {

        // Essa função lida com os 2 tipos de filtro apresentados
            // 1. A checkbox "ver lobinhos adotados"
            // 2. O filtro por texto
        // Em ambos os casos abaixo, o nome buscado é passado para as subfunções para manter a coerência no caso de usar-se os 2 filtros

        if (adotado == false) {
            // Se o user não marcar a checkbox "ver lobinhos adotados", cai no caso comum: buscar todos os lobinhos
            const dados = await buscarLobinhos({nome, pagina, limite})
            return dados
        } else {
            // Se não, cai no caso especial: buscar apenas lobinhos adotados
            const dados = await buscarLobinhosAdotados({nome, pagina, limite})
            return dados
        }

    } catch(error) {
        console.error(`Erro ao buscar lobinhos: ${error}`)
        throw error
    }
}


// Função para requisitar todos os lobinhos
async function buscarLobinhos({ nome = "", pagina = 1, limite = 4 } = {}) {
    try {
        // A requisição não precisa do query param "adotado"
        const response = await fetch(`http://localhost:3000/lobinhos?nome_like=${nome}&_page=${pagina}&_limit=${limite}`)
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const lobinhos = await response.json()

        // Linha usada para capturar o número de objetos em lobinhos.json
        const totalLobinhos = parseInt(response.headers.get('X-Total-Count'))
        const totalPages = Math.ceil(totalLobinhos / limite)

        return {
            lobos: lobinhos,
            pagina,
            totalPaginas: totalPages
        }
    } catch (error) {
        console.error(`Erro ao buscar lobinhos: ${error}`)
        throw error
    }
}


// Função para requisitar lobinhos adotados
async function buscarLobinhosAdotados({ nome = "", pagina = 1, limite = 4 } = {}) {
    try {
        const response = await fetch(`http://localhost:3000/lobinhos?nome_like=${nome}&_page=${pagina}&_limit=${limite}&adotado=true`)
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const lobinhos = await response.json()

        // Linha usada para capturar o número de objetos em lobinhos.json
        const totalLobinhos = parseInt(response.headers.get('X-Total-Count'))
        const totalPages = Math.ceil(totalLobinhos / limite)

        return {
            lobos: lobinhos,
            pagina,
            totalPaginas: totalPages
        }
    } catch (error) {
        console.error(`Erro ao buscar lobinhos: ${error}`)
        throw error
    }
}


// Função para requisitar um único lobinho por ID
export async function buscarLobinhoID(id) {
    try{
        const response = await fetch(`http://localhost:3000/lobinhos?id=${id}`);

        if(!response.ok){
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const lobinho = await response.json();
        return lobinho
    }catch(error){
        console.error('Erro ao buscar lobinhos:', error);
        throw error;
    }
}