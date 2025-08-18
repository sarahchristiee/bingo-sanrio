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
