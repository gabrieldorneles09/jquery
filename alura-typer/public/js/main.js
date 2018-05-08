console.log("Olá, Mundo!");

var numPalavras = $(".frase").text().split(" ").length;
console.log(numPalavras);

var tamanhoFrase = $("#tamanho-frase");
console.log(tamanhoFrase);

tamanhoFrase.text(numPalavras);