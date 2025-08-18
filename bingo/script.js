// lista de todos os números possíveis (1 até 75)
let pool = [];

// conjunto que guarda os números que já foram sorteados (não repete)
let drawn = new Set();

// função para facilitar pegar elementos do HTML
const $ = (sel) => document.querySelector(sel);

// pega os elementos da página
const btnDraw = $("#btnDraw");           // botão "sortear"
const currentNumber = $("#currentNumber"); // mostra o último número sorteado
const nums = $("#nums");                 // área que mostra as bolinhas já sorteadas

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
  pool = Array.from({ length: 75 }, (_, i) => i + 1);
  drawn.clear();
  currentNumber.textContent = "—";
  renderNums();
  btnDraw.disabled = false;
}

// mostra na tela todas as bolinhas já sorteadas, em ordem crescente
function renderNums() {
  nums.innerHTML = ""; // limpa a lista
  [...drawn]
    .sort((a, b) => a - b)
    .forEach(n => {
      const div = document.createElement("div");
      div.className = "ball";
      div.textContent = `${getLetter(n)}${n}`;
      nums.appendChild(div);
    });
}

// sorteia um número que ainda não saiu e atualiza a tela
function draw() {
  if (drawn.size === pool.length) {
    alert("Todos os números foram sorteados 🎉");
    btnDraw.disabled = true;
    return;
  }

  let n;
  do {
    n = pool[Math.floor(Math.random() * pool.length)];
  } while (drawn.has(n));

  drawn.add(n);
  currentNumber.textContent = `${getLetter(n)}${n}`;
  renderNums();
}

// eventos do botão
btnDraw.addEventListener("click", draw);

// inicia o sorteador
init();
