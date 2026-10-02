// ========================================
// DETOX DIGITAL - JAVASCRIPT
// ========================================

// QUANDO A PÁGINA CARREGA
document.addEventListener("DOMContentLoaded", function () {

    // BOTÃO DA REFLEXÃO
    const botaoDiagnostico = document.querySelector(
        '#diagnostico .botao'
    );

    if (botaoDiagnostico) {
        botaoDiagnostico.addEventListener(
            "click",
            calcularDiagnostico
        );
    }

    // BOTÃO DO DESAFIO
    const botaoDesafio = document.querySelector(
        '#desafio .botao'
    );

    if (botaoDesafio) {
        botaoDesafio.addEventListener(
            "click",
            criarDesafio
        );
    }

    // BOTÃO DO COMPROMISSO
    const botoes = document.querySelectorAll(
        ".compromisso .botao"
    );

    botoes.forEach(function (botao) {
        botao.addEventListener(
            "click",
            salvarCompromisso
        );
    });

    // BOTÃO "REFAZER MINHA REFLEXÃO"
    const botaoRefazer = document.querySelector(
        '#resultado-diagnostico .botao-secundario'
    );

    if (botaoRefazer) {
        botaoRefazer.addEventListener(
            "click",
            refazerReflexao
        );
    }

    carregarCompromisso();
});


// ========================================
// REFLEXÃO DIGITAL
// ========================================

function calcularDiagnostico() {

    const perguntas = document.querySelectorAll(
        '#diagnostico input[type="checkbox"]'
    );

    let pontos = 0;

    perguntas.forEach(function (pergunta) {

        if (pergunta.checked) {
            pontos++;
        }

    });

    const total = perguntas.length;

    const resultado = document.getElementById(
        "resultado-diagnostico"
    );

    if (!resultado) {
        return;
    }

    resultado.style.display = "block";

    let titulo;
    let texto;
    let proximoPasso;


    if (pontos === 0) {

        titulo = "🌱 Seus hábitos parecem equilibrados";

        texto = `
            Você não marcou nenhuma das situações apresentadas.
            Isso pode indicar que, neste momento, você não percebe
            esses comportamentos como frequentes na sua rotina.
            Mesmo assim, continuar observando seus hábitos digitais
            pode ajudar a manter uma relação consciente com a tecnologia.
        `;

        proximoPasso = `
            Continue utilizando a tecnologia de forma intencional
            e mantenha momentos do dia para outras atividades.
        `;

    } else if (pontos <= 2) {

        titulo = "🌿 Alguns hábitos merecem atenção";

        texto = `
            Você marcou ${pontos} de ${total} situações.
            Isso não significa que exista um problema.
            Esta atividade serve para ajudar você a perceber
            comportamentos que podem estar acontecendo de
            maneira automática no dia a dia.
        `;

        proximoPasso = `
            Escolha uma pequena mudança do desafio de 7 dias
            e observe como ela funciona na sua rotina.
        `;

    } else if (pontos <= 5) {

        titulo = "🌼 Vale experimentar algumas mudanças";

        texto = `
            Você marcou ${pontos} de ${total} situações.
            Alguns comportamentos relacionados ao uso do celular
            e das redes sociais aparecem com frequência na sua
            rotina. Pode ser interessante experimentar períodos
            específicos sem redes sociais ou notificações.
        `;

        proximoPasso = `
            Comece com uma mudança simples. Por exemplo:
            estabelecer um período do dia sem redes sociais,
            evitar o celular durante uma refeição ou criar
            alguns minutos de atividade offline.
        `;

    } else {

        titulo = "🌳 Que tal repensar alguns hábitos digitais?";

        texto = `
            Você marcou ${pontos} de ${total} situações.
            Vários dos comportamentos apresentados fazem parte
            da sua rotina. O resultado não é um diagnóstico
            médico ou psicológico e não significa que exista
            algo "errado" com você.

            Ele serve apenas como um ponto de partida para
            observar seus hábitos e pensar em pequenas mudanças.
        `;

        proximoPasso = `
            Experimente escolher duas ou três ações do desafio
            de 7 dias. O objetivo não é abandonar a tecnologia,
            mas perceber se pequenas alterações ajudam você
            a encontrar uma rotina mais equilibrada.
        `;
    }


    const porcentagem = Math.round(
        (pontos / total) * 100
    );


    resultado.innerHTML = `

        <div class="resultado-topo">

            <h3>${titulo}</h3>

            <div class="pontuacao">
                ${pontos} de ${total}
            </div>

        </div>


        <div class="resultado-bloco">

            <strong>O que esse resultado significa?</strong>

            <p>${texto}</p>

        </div>


        <div class="resultado-bloco proximo-passo">

            <strong>🌱 Próximo passo</strong>

            <p>${proximoPasso}</p>

        </div>


        <div class="progresso">

            <div class="progresso-texto">

                <span>Situações identificadas</span>

                <span>${porcentagem}%</span>

            </div>


            <div class="barra">

                <div
                    class="barra-preenchida"
                    style="width: ${porcentagem}%"
                ></div>

            </div>

        </div>


        <button
            type="button"
            class="botao-secundario"
        >
            ↻ Refazer minha reflexão
        </button>

    `;


    // Como o botão foi criado agora pelo JavaScript,
    // precisamos ativar o clique dele aqui.

    const botaoRefazer = resultado.querySelector(
        ".botao-secundario"
    );

    if (botaoRefazer) {

        botaoRefazer.addEventListener(
            "click",
            refazerReflexao
        );

    }


    resultado.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


// ========================================
// REFAZER REFLEXÃO
// ========================================

function refazerReflexao() {

    // Encontra todas as opções da reflexão
    const perguntas = document.querySelectorAll(
        '#diagnostico input[type="checkbox"]'
    );

    // Desmarca todas
    perguntas.forEach(function (pergunta) {

        pergunta.checked = false;

    });


    // Encontra o resultado
    const resultado = document.getElementById(
        "resultado-diagnostico"
    );

    // Esconde o resultado
    if (resultado) {

        resultado.style.display = "none";

        resultado.innerHTML = "";

    }


    // Volta para o início da reflexão
    const diagnostico = document.getElementById(
        "diagnostico"
    );

    if (diagnostico) {

        diagnostico.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// ========================================
// DESAFIO DE 7 DIAS
// ========================================

function criarDesafio() {

    const desafios = document.querySelectorAll(
        '#desafio input[type="checkbox"]'
    );

    const resultado = document.getElementById(
        "resultado-desafio"
    );

    if (!resultado) {
        return;
    }

    const selecionados = [];

    desafios.forEach(function (desafio) {

        if (desafio.checked) {

            selecionados.push(
                desafio.parentElement.textContent.trim()
            );

        }

    });


    resultado.style.display = "block";


    if (selecionados.length === 0) {

        resultado.innerHTML = `

            <div class="resultado-bloco">

                <strong>💡 Escolha pelo menos uma atividade</strong>

                <p>
                    Marque uma ou mais opções acima para
                    montar seu desafio de 7 dias.
                </p>

            </div>

        `;

        return;
    }


    let lista = "<ul>";


    selecionados.forEach(function (item) {

        lista += `<li>${item}</li>`;

    });


    lista += "</ul>";


    const progresso = Math.round(
        (selecionados.length / desafios.length) * 100
    );


    resultado.innerHTML = `

        <div class="resultado-topo">

            <h3>🌱 Seu desafio está pronto!</h3>

            <div class="pontuacao">
                ${selecionados.length} atividades
            </div>

        </div>


        <div class="resultado-bloco">

            <strong>Meu desafio de 7 dias</strong>

            <p>
                Durante os próximos sete dias, experimente
                colocar estas pequenas mudanças em prática:
            </p>

            ${lista}

        </div>


        <div class="resultado-bloco proximo-passo">

            <strong>💡 Lembre-se</strong>

            <p>
                Você não precisa mudar tudo de uma vez.
                O objetivo é experimentar, observar seus hábitos
                e descobrir quais mudanças funcionam melhor
                para a sua rotina.
            </p>

        </div>


        <div class="progresso">

            <div class="progresso-texto">

                <span>Atividades escolhidas</span>

                <span>${progresso}%</span>

            </div>


            <div class="barra">

                <div
                    class="barra-preenchida"
                    style="width: ${progresso}%"
                ></div>

            </div>

        </div>

    `;


    resultado.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


// ========================================
// COMPROMISSO DIGITAL
// ========================================

function salvarCompromisso() {

    const campo = document.getElementById(
        "compromisso"
    );

    const resultado = document.getElementById(
        "resultado-compromisso"
    );

    if (!campo || !resultado) {
        return;
    }


    const texto = campo.value.trim();

    resultado.style.display = "block";


    if (texto === "") {

        resultado.innerHTML = `

            <div class="resultado-bloco">

                <strong>✏️ Escreva seu compromisso</strong>

                <p>
                    Digite uma pequena mudança que você
                    gostaria de experimentar.
                </p>

            </div>

        `;

        return;
    }


    localStorage.setItem(
        "compromissoDigital",
        texto
    );


    resultado.innerHTML = `

        <div class="compromisso-salvo">

            <strong>🌱 Meu compromisso</strong>

            <p>"${texto}"</p>

            <p>
                Pequenas mudanças podem começar com uma
                decisão simples e possível de colocar em prática.
            </p>

        </div>

    `;
}


// ========================================
// CARREGAR COMPROMISSO
// ========================================

function carregarCompromisso() {

    const compromissoSalvo =
        localStorage.getItem(
            "compromissoDigital"
        );

    const campo =
        document.getElementById(
            "compromisso"
        );


    if (compromissoSalvo && campo) {

        campo.value =
            compromissoSalvo;

    }

}