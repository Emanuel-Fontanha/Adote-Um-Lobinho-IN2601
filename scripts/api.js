export async function buscarLobinhos_porNome(nome) {
    try {

        const response = await fetch(`http://localhost:3000/lobinhos?nome_like=${nome}&_limit=4`);

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