// Função assíncrona para buscar todos os lobinhos:

async function buscarLobinhos() {
    try {
        const response = await fetch('http://localhost:3000/lobinhos');

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

buscarLobinhos()