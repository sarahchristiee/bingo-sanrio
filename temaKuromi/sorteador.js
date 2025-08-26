// --- Sorteador ---
// lista de números de 1 a 75
const pool = Array.from({ length: 75 }, (_, i) => i + 1);
let historicoNums = new Set();


const btnSortearNovo = document.querySelector("#btnSortearNovo");
const numAtual = document.querySelector("#numAtual");
const historicoTableBody = document.querySelector("#historicoTable tbody");

// função que retorna a letra de acordo com o número
function getLetras(n) {
  if (n <= 15) return "B";
  if (n <= 30) return "I";
  if (n <= 45) return "N";
  if (n <= 60) return "G";
  return "O"; // 75
}


// --- Cartela  ---

const bingoCard = document.getElementById("bingoCard");
const btnGerar = document.getElementById("btnGerar");

// gera nums random
function getRandomNumbers(min, max, count) {
  const nums = [];
  while (nums.length < count) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!nums.includes(n)) nums.push(n);
  }
  return nums.sort((a, b) => a - b);
}

// gera e desenha a cartela no DOM
function generateCard() {
  bingoCard.innerHTML = "";

  const letters = ["B", "I", "N", "G", "O"];
  letters.forEach(l => {
    const div = document.createElement("div");
    div.className = "header";
    div.textContent = l;
    bingoCard.appendChild(div);
  });

  const columns = [
    getRandomNumbers(1, 15, 5),
    getRandomNumbers(16, 30, 5),
    getRandomNumbers(31, 45, 5),
    getRandomNumbers(46, 60, 5),
    getRandomNumbers(61, 75, 5),
  ];

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const div = document.createElement("div");
      div.className = "numCartela";

      if (row === 2 && col === 2) {
        div.textContent = "FREE";
        div.classList.add("free", "marked");
      } else {
        div.textContent = columns[col][row];
        div.addEventListener("click", () => {
          div.classList.toggle("marked");
        });
      }

      bingoCard.appendChild(div);
    }
  }
}

generateCard();

btnGerar.addEventListener("click", generateCard);

// cria tabela fixa 15 linhas x 5 colunas para números de 1 a 75
function criarTabelaHistorico() {
  historicoTableBody.innerHTML = ""; // limpa tbody

  for (let row = 0; row < 15; row++) {
    const tr = document.createElement("tr");

    for (let col = 0; col < 5; col++) {
      const td = document.createElement("td");

      // Calcula número baseado em coluna e linha
      const numero = col * 15 + (row + 1);

      td.textContent = ""; // começa vazio
      td.dataset.numero = numero; // armazena número na célula

      tr.appendChild(td);
    }

    historicoTableBody.appendChild(tr);
  }
}


// atualiza a tabela exibindo os números sorteados
function atualizarTabelaHistorico() {
  historicoTableBody.querySelectorAll("td").forEach(td => {
    const numero = Number(td.dataset.numero);
    if (historicoNums.has(numero)) {
      td.textContent = numero;
      td.classList.add("sorteado");
    } else {
      td.textContent = "";
      td.classList.remove("sorteado");
    }
  });
}

// sorteia número novo
function draw() {
  if (historicoNums.size === pool.length) {
    alert("Todos os números foram sorteados 🎉");
    btnSortearNovo.disabled = true;
    return;
  }

  let n;
  do {
    n = pool[Math.floor(Math.random() * pool.length)];
  } while (historicoNums.has(n));

  historicoNums.add(n);
  numAtual.textContent = `${getLetras(n)}${n}`;
  atualizarTabelaHistorico();
}

// reinicia o sorteador
function init() {
  historicoNums.clear();
  numAtual.textContent = "-";
  btnSortearNovo.disabled = false;
  criarTabelaHistorico();
  atualizarTabelaHistorico();
}

btnSortearNovo.addEventListener("click", draw);

init();


