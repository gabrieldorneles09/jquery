$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("body").animate({
        scrollTop: posicaoPlacar+"px"
    }, 1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(700);
    setTimeout(() => {
        linha.remove();
    }, 700);
}

function mostraPlacar(){
    $(".placar").stop().slideToggle(700);
}

function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");

    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        console.log(usuario);
        var palavras = $(this).find("td:nth-child(2)").text();
        console.log(palavras);
        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);

        let dados = {
            placar: placar
        }

        $.post(baseUrl+"placar", dados, () => {
            console.log("Placar sincronizado com sucesso");
            $(".tooltip").tooltipster("open");
        }).fail(function(){
            $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
        }).always(function(){
            setTimeout(function(){
                $(".tooltip").tooltipster("close");
            }, 1200);
        });
    });
  
}

function atualizaPlacar(){
    $.get(baseUrl+"placar", function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);

            linha.find(".botao-remover").click(removeLinha);

            $("tbody").append(linha);
        });
    });
}