$("#botao-frase").click(fraseAleatoria);

$("#botao-frase-id").click(buscaFrase);

var baseUrl = "http://localhost:3000/";

function mostraErro(){
    $("#erro").show();
    setTimeout(() => {
        $("#erro").fadeOut();
    }, 3000);
}

function fraseAleatoria(){
    $("#spinner").show();
    $.get(baseUrl+"frases", trocaFraseAleatoria)
    .fail(() => {
        mostraErro();
    })
    .always(() => {
        $("#spinner").hide();
    });
}

function trocaFraseAleatoria(data){
    let frase = $(".frase");
    let numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase(){
    var fraseID = $("#frase-id").val();
    var dados = {
        id: fraseID
    }
    $("#spinner").show();
    $.get(baseUrl+"frases", dados,trocaFrase)
    .fail(() => {
        mostraErro();
    })
    .always(() => {
        $("#spinner").hide();
    });
}

function trocaFrase(data){
    $(".frase").text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}