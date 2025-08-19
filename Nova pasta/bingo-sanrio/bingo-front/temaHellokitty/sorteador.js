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
  nums.innerHTML = ""; //começa vazio
  [...historicoNums].sort((a, b) => a - b).forEach((n) => { //ordena o histórico
    const div = document.createElement("div"); //cria uma div
    div.className = "bolinha"; //nomeia a div
    div.textContent = `${getLetras(n)}${n}`;//o conteudo que vai mostrar na div é oq eu defini que vai ser sorteado
    nums.appendChild(div); // transforma a div no elemento filho da div nums
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
