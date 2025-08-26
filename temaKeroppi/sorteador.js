// lista de números de 1 a 75
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
  nums.innerHTML = ""; // limpa antes

  const letras = ["B", "I", "N", "G", "O"];

  letras.forEach((letra, i) => {
    // cria um container para cada letra
    const coluna = document.createElement("div");
    coluna.className = "coluna-letra";

    // título da letra
    const titulo = document.createElement("h3");
    titulo.textContent = letra;
    coluna.appendChild(titulo);

    // filtra só os números daquela letra
    const min = i * 15 + 1;
    const max = (i + 1) * 15;
    const numsLetra = [...historicoNums]
      .filter(n => n >= min && n <= max)
      .sort((a, b) => a - b);

    // adiciona as bolinhas dessa letra
    numsLetra.forEach(n => {
      const div = document.createElement("div");
      div.className = "bolinha";
      div.textContent = `${letra}${n}`;
      coluna.appendChild(div);
    });

    nums.appendChild(coluna);
  });
}

// sorteia número novo
function draw() {
  //se todos os números forem sorteados entra nesse if
  if (historicoNums.size === pool.length) {
    alert("Todos os números foram sorteados 🎉");
    bntSortearNovo.disabled = true;
    return;
  }

  let n;
  do {
    n = pool[Math.floor(Math.random() * pool.length)]; // seleciona um número aleatório dentro do lenght do array pool
  } while (historicoNums.has(n)); //continua enquanto não repetir

  historicoNums.add(n); // add número que já foi pro histórico
  numAtual.textContent = `${getLetras(n)}${n}`; //exibe o número que foi sorteado
  renderizarHistorico(); //chama a função pra atualizar a exibição do historico
}

// reinicia o jogo
function init() {
  historicoNums.clear();
  numAtual.textContent = "-";
  nums.innerHTML = "";
  bntSortearNovo.disabled = false;
}

// eventos, qnd clica executa
bntSortearNovo.addEventListener("click", draw);

// inicia
init();










// pega a área onde a cartela será desenhada (div com id="bingoCard")
const bingoCard = document.getElementById("bingoCard");

// pega o botão que gera uma nova cartela
const btnGerar = document.getElementById("btnGerar");

// função que gera uma lista de números aleatórios e únicos dentro de um intervalo
function getRandomNumbers(min, max, count) {
  const nums = [];
  while (nums.length < count) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!nums.includes(n)) nums.push(n);
  }
  return nums.sort((a, b) => a - b);
}

// função que monta a cartela
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

// gera a primeira cartela automaticamente ao abrir a página
generateCard();

// quando clicar no botão, gera uma nova cartela
btnGerar.addEventListener("click", generateCard);

