async function buscarLobinhoID(id) {
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

async function carregarLobinho(id){
    try{
        const lobinho = await buscarLobinhoID(id);

        let img=lobinho[0].imagem;
        let name=lobinho[0].nome;

        let foto = document.querySelector("#pic");
        foto.innerHTML = `<figure style='background-image: url(${img})'></figure>`

        let title = document.querySelector("h1");
        title.innerHTML = `<h1>Adote o(a) ${name}<h1>`

        let identificador = document.querySelector("h4");
        identificador.innerHTML = `<h4>ID:${id.toString().padStart(4, '0')}<h4>`
    }catch(error){
        console.error('Erro ao buscar lobinhos:', error);
        throw error;
    }
}

carregarLobinho(1000)