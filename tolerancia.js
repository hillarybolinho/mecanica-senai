function mudarIT(tipo, botao) {
    const titulo = document.getElementById('tituloIT');
    const desc = document.getElementById('descIT');
    const painel = document.getElementById('painelIT');
    
    // Remove classe ativa de todos os botões
    document.querySelectorAll('.btn-it').forEach(btn => btn.classList.remove('active'));
    // Adiciona no clicado
    botao.classList.add('active');

    const dados = {
        'fina': {
            titulo: 'Extra Precisa (IT 01 a IT 06)',
            desc: 'Foco em calibradores, instrumentos de medição e peças que exigem um ajuste perfeito sem folga. É a elite da mecânica!'
        },
        'media': {
            titulo: 'Corrente (IT 07 a IT 11)',
            desc: 'A mais usada no dia a dia da oficina. Peças de máquinas, eixos comuns e furos que permitem montagem manual ou com prensa leve.'
        },
        'grosseira': {
            titulo: 'Grosseira (IT 12 a IT 16)',
            desc: 'Para peças que não precisam de encaixe preciso, como estruturas de máquinas, chapas e componentes brutos de fundição.'
        }
    };

    titulo.innerText = dados[tipo].titulo;
    desc.innerText = dados[tipo].desc;
    
    // Pequena animação de "piscar" ao mudar
    painel.style.opacity = 0;
    setTimeout(() => painel.style.opacity = 1, 50);
}