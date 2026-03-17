// 1. CONVERTER POLEGADA FRACIONÁRIA PARA MM
function converterPolParaMM() {
    // O "|| 0" diz: se o campo estiver vazio, use o valor ZERO
    const inteiro = parseFloat(document.getElementById('pol-inteira').value) || 0;
    const num = parseFloat(document.getElementById('num').value) || 0;
    const den = parseFloat(document.getElementById('den').value) || 1; // Denominador nunca pode ser 0, então usamos 1
    
    const campoResultado = document.getElementById('resultadoMM');

    // Se o cara não digitou nada em nenhum campo, a gente avisa
    if (inteiro === 0 && num === 0) {
        campoResultado.innerHTML = "❌ Digite um valor!";
        return;
    }

    // A conta mágica: Inteiro + (Numerador / Denominador)
    const polegadaDecimal = inteiro + (num / den);
    const resultadoMM = polegadaDecimal * 25.4;

    campoResultado.innerHTML = `Resultado: <strong>${resultadoMM.toFixed(2).replace('.', ',')} mm</strong>`;
}
  
// 2. CONVERTER MM PARA POLEGADA FRACIONÁRIA (MÉTODO 5,04)
function converterMMParaPol() {
    const mm = parseFloat(document.getElementById('inputMM').value);
    const campoResultado = document.getElementById('resultadoPol');

    if (isNaN(mm) || mm <= 0) {
        campoResultado.innerHTML = "❌ Insira um valor em mm!";
        campoResultado.style.color = "#ff4d4d";
        return;
    }

    // Passo 1: Multiplicar por 5,04 para achar o numerador da base 128
    let numerador = Math.round(mm * 5.03937); // Usamos um valor mais preciso que 5,04 para evitar erros
    let denominador = 128;

    // Passo 2: Função para encontrar o Máximo Divisor Comum (MDC) para simplificar
    function obterMDC(a, b) {
        return b === 0 ? a : obterMDC(b, a % b);
    }

    const divisorComum = obterMDC(numerador, denominador);

    // Passo 3: Simplificar a fração
    const numSimplificado = numerador / divisorComum;
    const denSimplificado = denominador / divisorComum;

    // Passo 4: Formatar a saída (ex: se for 1/1, mostra 1")
    let resultadoFinal;
    if (denSimplificado === 1) {
        resultadoFinal = `${numSimplificado}"`;
    } else {
        resultadoFinal = `${numSimplificado}/${denSimplificado}"`;
    }

    campoResultado.innerHTML = `Resultado: <strong>${resultadoFinal}</strong>`;
    campoResultado.style.color = "#0D47A1";
}


