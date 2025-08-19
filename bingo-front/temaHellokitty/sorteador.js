// lista de números fixos de 1 a 75
const pool = Array.from({ length: 75 }, (_, i) => i + 1);
let historicoNums = new Set();

// pega elementos e fazer botãos
const bntSortearNovo = document.querySelector("#bntSortearNovo");
const numAtual = document.querySelector("#numAtual");
const nums = document.querySelector("#nums");

// função para cada letra com seu conjunto de números
function getLetras(n) {
  if (n <= 15) return "B";
  if (n <= 30) return "I";
  if (n <= 45) return "N";
  if (n <= 60) return "G";
  return "O"; // 61–75
}

// mostra historico do sorteio
function renderizarHistorico() {
  nums.innerHTML = "";
  [...historicoNums].sort((a, b) => a - b).forEach((n) => {
    const div = document.createElement("div");
    div.className = "bolinha";
    div.textContent = `${getLetras(n)}${n}`;
    nums.appendChild(div);
  });
}

// sorteia número novo
function draw() {
  if (historicoNums.size === pool.length) {
    alert("Todos os números foram sorteados 🎉");
    bntSortearNovo.disabled = true;
    return;
  }

  let n;
  do {
    n = pool[Math.floor(Math.random() * pool.length)];
  } while (historicoNums.has(n));

  historicoNums.add(n);
  numAtual.textContent = `${getLetras(n)}${n}`;
  renderizarHistorico();
}

// reinicia o jogo
function init() {
  historicoNums.clear();
  numAtual.textContent = "-";
  nums.innerHTML = "";
  bntSortearNovo.disabled = false;
}

// eventos
bntSortearNovo.addEventListener("click", draw);

// inicia
init();
