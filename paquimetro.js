function calcularPolegada() {
    // 1. Pega os valores dos inputs
    const fixaInput = document.getElementById('fixa').value;
    const nonioInput = document.getElementById('nonio').value;
    const display = document.getElementById('p-resultado');

    // 2. Transforma em números inteiros
    let fixa = parseInt(fixaInput) || 0;
    let nonio = parseInt(nonioInput) || 0;

    // 3. Faz a conta: (Fixa * 8 + Nonio) / 128
    let numerador = (fixa * 8) + nonio;
    let denominador = 128;

    // 4. Função para simplificar a fração (MDC)
    function simplificar(n, d) {
        let a = n;
        let b = d;
        while (b !== 0) {
            let t = b;
            b = a % b;
            a = t;
        }
        return [n / a, d / a];
    }

    // 5. Calcula a simplificação
    const [nSimp, dSimp] = simplificar(numerador, denominador);

    // 6. Mostra na tela
    if (numerador === 0) {
        display.innerHTML = "Resultado: 0\"";
    } else {
        display.innerHTML = `Resultado: ${nSimp}/${dSimp}"`;
    }
}