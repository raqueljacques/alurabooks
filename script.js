async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    var cidade = document.getElementById('cidade');
    var logradouro = document.getElementById('endereco');
    var estado = document.getElementById('estado');
    mensagemErro.innerHTML = "";
    
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        bairro.value = consultaCEPConvertida.bairro

        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`
        cidade.value = "";
        logradouro.value = "";
        estado.value = "";
        bairro.value = "";
    }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value));