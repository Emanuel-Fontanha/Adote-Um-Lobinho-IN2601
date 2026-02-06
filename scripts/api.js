export async function buscarLobinhos() {
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