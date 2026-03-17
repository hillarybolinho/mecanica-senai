document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('quadroDesenho');
    const ctx = canvas.getContext('2d');
    const btnLapis = document.getElementById('btnLapis');
    const btnBorracha = document.getElementById('btnBorracha');
    const btnLimpar = document.getElementById('btnLimpar');

    // Ajusta o tamanho real do canvas para a tela
    function ajustarCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        carregarDesenho(); // Recarrega o desenho salvo ao redimensionar
    }

    window.addEventListener('resize', ajustarCanvas);
    ajustarCanvas();

    let desenhando = false;
    let modo = 'lapis'; // 'lapis' ou 'borracha'

    // Configurações iniciais do traço
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#333';

    // Funções de Desenho
    function iniciar(e) {
        desenhando = true;
        desenhar(e);
    }

    function parar() {
        desenhando = false;
        ctx.beginPath();
        salvarDesenho(); // Salva toda vez que solta o mouse/dedo
    }

    function desenhar(e) {
        if (!desenhando) return;

        // Suporte para Mouse e Touch (Celular)
        const rect = canvas.getBoundingClientRect();
        const posX = (e.clientX || e.touches[0].clientX) - rect.left;
        const posY = (e.clientY || e.touches[0].clientY) - rect.top;

        ctx.globalCompositeOperation = (modo === 'borracha') ? 'destination-out' : 'source-over';
        ctx.lineWidth = (modo === 'borracha') ? 20 : 2;

        ctx.lineTo(posX, posY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(posX, posY);
    }

    // Eventos do Mouse
    canvas.addEventListener('mousedown', iniciar);
    canvas.addEventListener('mousemove', desenhar);
    canvas.addEventListener('mouseup', parar);

    // Eventos de Touch (Celular)
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); iniciar(e); });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); desenhar(e); });
    canvas.addEventListener('touchend', parar);

    // Controles dos Botões
    btnLapis.onclick = () => {
        modo = 'lapis';
        btnLapis.classList.add('ativo');
        btnBorracha.classList.remove('ativo');
    };

    btnBorracha.onclick = () => {
        modo = 'borracha';
        btnBorracha.classList.add('ativo');
        btnLapis.classList.remove('ativo');
    };

    btnLimpar.onclick = () => {
        if (confirm("Deseja limpar toda a prancheta?")) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            salvarDesenho();
        }
    };

    // Dentro do seu DOMContentLoaded, substitua a parte do btnLimpar por isso:

const modalAviso = document.getElementById('modalAviso');
const confirmarBtn = document.getElementById('confirmarLimpar');
const cancelarBtn = document.getElementById('cancelarLimpar');

// Quando clicar no botão Limpar da barra de ferramentas
btnLimpar.onclick = () => {
    modalAviso.style.display = 'flex'; // Abre o modal
};

// Se confirmar a limpeza
confirmarBtn.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem('desenhoSalvo'); // Limpa o banco de dados local
    modalAviso.style.display = 'none'; // Fecha o modal
};

// Se cancelar
cancelarBtn.onclick = () => {
    modalAviso.style.display = 'none'; // Apenas fecha o modal
};

// Fecha se clicar fora da caixinha branca
window.onclick = (event) => {
    if (event.target == modalAviso) {
        modalAviso.style.display = 'none';
    }
};

    // Lógica de Salvar no Navegador (LocalStorage)
    function salvarDesenho() {
        localStorage.setItem('desenhoSalvo', canvas.toDataURL());
    }

    function carregarDesenho() {
        const dataURL = localStorage.getItem('desenhoSalvo');
        if (dataURL) {
            const img = new Image();
            img.src = dataURL;
            img.onload = () => ctx.drawImage(img, 0, 0);
        }
    }
});