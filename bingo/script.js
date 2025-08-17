// lista de todos os números possíveis (1 até 75)
let pool = [];

// conjunto que guarda os números que já foram sorteados (não repete)
let drawn = new Set();

// função para facilitar pegar elementos do HTML
const $ = (sel) => document.querySelector(sel);

// pega os elementos da página
const btnDraw = $("#btnDraw");         // botão "sortear"
const currentNumber = $("#currentNumber"); // mostra o último número sorteado
const balls = $("#balls");             // área que mostra as bolinhas já sorteadas

// função que retorna a letra do bingo de acordo com o número
function getLetter(n) {
  if (n >= 1 && n <= 15) return "B";
  if (n >= 16 && n <= 30) return "I";
  if (n >= 31 && n <= 45) return "N";
  if (n >= 46 && n <= 60) return "G";
  return "O"; // 61–75
}

// inicia o jogo
function init() {
  // cria um array com números de 1 até 75
  pool = Array.from({ length: 75 }, (_, i) => i + 1);

  // limpa os sorteados
  drawn.clear();

  // limpa o número atual
  currentNumber.textContent = "—";

  // renderiza (mostra) as bolinhas sorteadas (vazio no começo)
  renderBalls();

  // habilita o botão de sortear
  btnDraw.disabled = false;
}

// mostra na tela todas as bolinhas já sorteadas
function renderBalls() {
  balls.innerHTML = ""; // limpa
  [...drawn].sort((a, b) => a - b).forEach(n => {
    const div = document.createElement("div");
    const letter = getLetter(n);
    div.className = "ball"; 
    div.textContent = `${letter}${n}`;
    balls.appendChild(div);
  });
}


// sorteia um número
function draw() {
  // se já sorteou todos
  if (drawn.size === pool.length) {
    alert("Todos os números foram sorteados 🎉");
    btnDraw.disabled = true;
    return;
  }

  let n;
  // sorteia um número que ainda não saiu
  do {
    n = pool[Math.floor(Math.random() * pool.length)];
  } while (drawn.has(n));

  // adiciona ao conjunto de sorteados
  drawn.add(n);

  // mostra o número atual
  currentNumber.textContent = `${getLetter(n)}${n}`;

  // atualiza as bolinhas na tela
  renderBalls();
}

// eventos do botão
btnDraw.addEventListener("click", draw);  

// inicia
init();
