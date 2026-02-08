async function criarLobinho(nome, idade, link, descrição){
    const novoLobinho = {
        "nome": nome,
        "idade": idade,
        "descricao": descrição,
        "imagem": link,
        "adotado": false,
        "nomeDono": null,
        "idadeDono": null,
        "emailDono": null
    }

    try{
        const response = await fetch("http://localhost:3000/lobinhos",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoLobinho)
        });
        if(!response.ok){
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const criado = await response.json();
        console.log("lobinho criado:", criado);
    }
    catch(error){
        console.error("Erro ao buscar lobinhos:", error);
        throw error;
    }
}

let btn_enviar = document.querySelector("#send");
btn_enviar.addEventListener("click", ()=>{
    let mensage = document.querySelectorAll(".input");
    if(mensage[0].value!='' && Number(mensage[1].value)!=0 && mensage[2].value!='' && mensage[3].value!=''){
        criarLobinho(mensage[0].value,Number(mensage[1].value),mensage[2].value,mensage[3].value)
    }
})