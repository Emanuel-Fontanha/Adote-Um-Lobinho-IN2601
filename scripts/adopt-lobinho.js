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
        foto.innerHTML = `<figure style='background-image: url(${img})' style='background-position: center'></figure>`

        let title = document.querySelector("h1");
        title.innerHTML = `<h1>Adote o(a) ${name}<h1>`

        let identificador = document.querySelector("h4");
        identificador.innerHTML = `<h4>ID:${id.toString().padStart(4, '0')}<h4>`
    }catch(error){
        console.error('Erro ao buscar lobinhos:', error);
        throw error;
    }
}

async function adotarLobinho(id, nome, idade, email) {
    const lobinhoMudança = {
      "adotado": true,
      "nomeDono": nome,
      "idadeDono": idade,
      "emailDono": email
    };

    try{
        const response = await fetch(`http://localhost:3000/lobinhos/${id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lobinhoMudança)
        });
        if(!response.ok){
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const mudança = await response.json();
        console.log("adoção realizada:", mudança);
    }
    catch(error){
        console.error("Erro ao buscar lobinhos:", error);
        throw error;
    }
}
let id = 998;

carregarLobinho(id);

let btn_enviar = document.querySelector("#send");
btn_enviar.addEventListener("click", ()=>{
    let mensage = document.querySelectorAll(".input");
    if( mensage[0].value!='' && Number(mensage[1].value)!=0 && mensage[2].value!=''){
            adotarLobinho(id, mensage[0].value, Number(mensage[1].value), mensage[2].value);
        }
    }
);