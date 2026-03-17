// Objeto com as informações técnicas baseadas no seu caderno e na peça real
const infos = {
    'ângulo': {
        titulo: 'Traçado e Corte do Ângulo',
        texto: 'Utilizamos o transferidor de graus e riscador para marcar a crista de corte. O corte foi feito com arco de serra de 24 dentes e acabamento para precisão de 32°.'
    },
    'furos': {
        titulo: 'Furação e Rosca (#1 e #3)',
        texto: 'Após traçar e puncionar, realizamos a furação com broca e abrimos as roscas métrica e em polegada utilizando o jogo de machos e desandador.'
    },
    'raio': {
        titulo: 'Raio de 6,0mm e Acabamento',
        texto: 'Traçamos o raio de 6,0mm e executamos a limagem com movimento circular. Finalizamos com a lima murça para retirar rebarbas e marcas de riscos.'
    },
    'rasgo': {
        titulo: 'Corte e Limagem do Rasgo',
        texto: 'Operação de serragem para abrir o canal e limagem com controle de planicidade e esquadro para atingir a medida dimensional final.'
    }
};

// Função para mostrar o painel com a informação correta
function mostrarInfo(parte) {
    const painel = document.getElementById('painel-info');
    const titulo = document.getElementById('titulo-info');
    const texto = document.getElementById('texto-info');

    if (infos[parte]) {
        titulo.innerText = infos[parte].titulo;
        texto.innerText = infos[parte].texto;
        painel.style.display = 'block'; // Mostra o painel
    }
}

// Função para esconder o painel
function fecharInfo() {
    document.getElementById('painel-info').style.display = 'none';
}