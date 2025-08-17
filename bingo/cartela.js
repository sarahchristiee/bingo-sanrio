// pega a área onde a cartela será desenhada (div com id="bingoCard")
const bingoCard = document.getElementById("bingoCard");

// pega o botão que gera uma nova cartela
const btnGenerate = document.getElementById("btnGenerate");

// função que gera uma lista de números aleatórios e únicos dentro de um intervalo
function getRandomNumbers(min, max, count) {
  const nums = [];
  while (nums.length < count) {
    // sorteia um número entre min e max
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    // só adiciona se ainda não foi sorteado
    if (!nums.includes(n)) nums.push(n);
  }
  // retorna os números em ordem crescente
  return nums.sort((a, b) => a - b);
}

// função que monta a cartela
function generateCard() {
  // limpa a cartela antiga
  bingoCard.innerHTML = "";

  // escreve as letras B I N G O no topo
  const letters = ["B", "I", "N", "G", "O"];
  letters.forEach(l => {
    const div = document.createElement("div");
    div.className = "header";
    div.textContent = l;
    bingoCard.appendChild(div);
  });

  // sorteia os números de cada coluna, respeitando os intervalos do bingo
  const columns = [
    getRandomNumbers(1, 15, 5),   // B
    getRandomNumbers(16, 30, 5),  // I
    getRandomNumbers(31, 45, 5),  // N
    getRandomNumbers(46, 60, 5),  // G
    getRandomNumbers(61, 75, 5),  // O
  ];

  // preenche a cartela linha por linha
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const div = document.createElement("div");

      // casa do meio (linha 2, coluna 2) é sempre "FREE"
      if (row === 2 && col === 2) {
        div.textContent = "FREE";
        div.classList.add("free", "marked"); // já marcada por padrão
      } else {
        // insere o número correspondente da coluna
        div.textContent = columns[col][row];
        // permite clicar para marcar/desmarcar o número
        div.addEventListener("click", () => {
          div.classList.toggle("marked");
        });
      }

      // adiciona o quadrado na cartela
      bingoCard.appendChild(div);
    }
  }
}

// gera a primeira cartela automaticamente ao abrir a página
generateCard();

// quando clicar no botão, gera uma nova cartela
btnGenerate.addEventListener("click", generateCard);
